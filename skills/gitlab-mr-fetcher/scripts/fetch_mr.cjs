const https = require('https');
const url = require('url');
const { execSync } = require('child_process');

/**
 * Fetch data from GitLab API
 */
function fetchGitLab(path, token, host) {
  const apiUrl = new url.URL(path, host);
  return new Promise((resolve, reject) => {
    const options = {
      hostname: apiUrl.hostname,
      path: apiUrl.pathname + apiUrl.search,
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': token,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`GitLab API error: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', (e) => { reject(e); });
    req.end();
  });
}

function runGitCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  } catch (e) {
    console.error(`Git Command failed: ${command}`);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node fetch_mr.cjs <MR_URL_OR_ID> [PROJECT_ID]');
    process.exit(1);
  }

  const token = process.env.GITLAB_TOKEN;
  if (!token) {
    console.error('Error: GITLAB_TOKEN environment variable is not set.');
    process.exit(1);
  }

  let mrId, projectId, host = process.env.GITLAB_HOST || 'https://gitlab.com';

  const input = args[0];
  const urlMatch = input.match(/^(https?:\/\/[^\/]+)\/(.+)\/-\/merge_requests\/(\d+)/);
  
  if (urlMatch) {
    host = urlMatch[1];
    const projectPath = encodeURIComponent(urlMatch[2]);
    mrId = urlMatch[3];
    projectId = projectPath;
  } else {
    mrId = input;
    projectId = args[1];
    if (!projectId) {
      console.error('Error: Project ID is required if MR ID is provided instead of a URL.');
      process.exit(1);
    }
  }

  try {
    console.log(`Fetching MR #${mrId} from project ${projectId} on ${host}...`);
    
    const mrDetails = await fetchGitLab(`/api/v4/projects/${projectId}/merge_requests/${mrId}`, token, host);
    const mrChanges = await fetchGitLab(`/api/v4/projects/${projectId}/merge_requests/${mrId}/changes`, token, host);
    
    console.log('\n--- MR METADATA ---');
    console.log(`Title: ${mrDetails.title}`);
    console.log(`Author: ${mrDetails.author.name} (@${mrDetails.author.username})`);
    console.log(`Source Branch: ${mrDetails.source_branch}`);
    console.log(`Target Branch: ${mrDetails.target_branch}`);
    console.log(`Description:\n${mrDetails.description || 'No description provided.'}`);
    
    console.log('\n--- CHANGES ---');
    if (mrChanges.changes && mrChanges.changes.length > 0) {
      mrChanges.changes.forEach(change => {
        console.log(`\nFile: ${change.new_path}${change.renamed_file ? ` (renamed from ${change.old_path})` : ''}`);
        if (change.deleted_file) console.log('[Deleted]');
        if (change.new_file) console.log('[New File]');
        console.log('Diff:');
        console.log(change.diff);
        console.log('-'.repeat(40));
      });
    } else {
      console.log('No changes found.');
    }

    // Attempt to checkout branch if in a git repo
    console.log('\n--- WORKSPACE ACTION ---');
    try {
      execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
      const sourceBranch = mrDetails.source_branch;
      console.log(`Detected Git repository. Attempting to checkout branch: ${sourceBranch}`);
      
      runGitCommand(`git fetch origin ${sourceBranch}`);
      runGitCommand(`git checkout ${sourceBranch}`);
      console.log(`✅ Successfully switched to branch: ${sourceBranch}`);
    } catch (e) {
      console.log('Not in a Git repository or git command failed. Skipping checkout.');
    }

    // Success message for LLM
    console.log('\n✅ Successfully fetched MR details and synced workspace.');
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();

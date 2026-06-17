# apix

A terminal-native HTTP client for developers who don't want to leave the command line. Make requests, save the ones you use often, and replay them with a single word — no GUI, no clicking around, no context switching.

```bash
apix request POST https://api.example.com/users -d '{"name":"Jane"}'
```

```
● 201 Created  142ms
------------------------
{
  "id": 11,
  "name": "Jane"
}
```

## Why apix

Most API testing happens in a separate GUI app — open it, find the right tab, click send, switch back to your terminal. If you're already living in the terminal while building a backend, that context switch adds up fast.

apix keeps you where you are. It saves requests to a local collection, remembers your history, and gets you a colored, readable response in under a second.

## Installation

```bash
npm install -g apix-cli
```

Requires Node.js 18 or higher (uses the native `fetch` API).

Verify it installed correctly:

```bash
apix --version
```

## Quick start

```bash
# Fire a GET request
apix request GET https://jsonplaceholder.typicode.com/todos/1

# POST with a JSON body
apix request POST https://jsonplaceholder.typicode.com/posts -d '{"title":"hello"}'

# Save it so you never have to type it again
apix save todos GET https://jsonplaceholder.typicode.com/todos/1

# Replay it anytime
apix run todos
```

## Usage

### Making requests

```bash
apix request <METHOD> <URL> [options]
```

| Option | Description |
|---|---|
| `-H, --header <header...>` | Add one or more headers, e.g. `-H "Authorization: Bearer token"` |
| `-d, --data <json>` | JSON request body |
| `-s, --save-as <name>` | Save this request to your collection after it runs |

**Examples:**

```bash
# GET
apix request GET https://api.example.com/users

# POST with a body
apix request POST https://api.example.com/users -d '{"name":"Jane","role":"admin"}'

# With an auth header
apix request GET https://api.example.com/profile -H "Authorization: Bearer eyJhbGc..."

# Multiple headers
apix request GET https://api.example.com/data -H "Authorization: Bearer token" -H "X-Client: apix"

# Run it and save it in one shot
apix request GET https://api.example.com/users --save-as list-users
```

`request` has the alias `req`, so `apix req GET ...` works too.

### Saving requests

If you hit the same endpoint repeatedly while developing, save it once:

```bash
apix save <name> <METHOD> <URL> [options]
```

```bash
apix save createUser POST https://api.example.com/users -d '{"name":"test"}' -H "Authorization: Bearer token"
```

### Replaying saved requests

```bash
apix run <name>
```

```bash
apix run createUser
```

### Listing your collection

```bash
apix list
```

Alias: `apix ls`

```
  todos                GET     https://jsonplaceholder.typicode.com/todos/1
  createUser           POST    https://api.example.com/users
  weather              GET     https://api.openweathermap.org/data/2.5/weather
```

### Viewing history

Every request you make — saved or not — is logged automatically.

```bash
apix history
apix history -n 20    # show the last 20 instead of the default 10
```

Alias: `apix hist`

```
  10:32:01 AM   GET     200   143ms   https://jsonplaceholder.typicode.com/todos/1
  10:28:44 AM   POST    201   230ms   https://api.example.com/users
  10:21:12 AM   DELETE  200    98ms   https://api.example.com/users/4
```

## Command reference

| Command | Alias | Description |
|---|---|---|
| `apix request <method> <url>` | `req` | Make an HTTP request |
| `apix save <name> <method> <url>` | — | Save a request to your collection |
| `apix run <name>` | — | Replay a saved request |
| `apix list` | `ls` | List all saved requests |
| `apix history` | `hist` | Show recent request history |
| `apix --version` | — | Show the installed version |
| `apix --help` | — | Show all commands and options |

## Where your data lives

apix stores your collection and history locally on your machine using [`conf`](https://www.npmjs.com/package/conf) — nothing is sent anywhere except the actual HTTP requests you make. On most systems that's in your OS's standard app-config directory (e.g. `%APPDATA%\apix-cli` on Windows, `~/Library/Preferences` on macOS, `~/.config/apix-cli` on Linux).

## Local development

Clone the repo and link it globally so you can run `apix` from anywhere while you work on it:

```bash
git clone https://github.com/yourusername/apix-cli.git
cd apix-cli
npm install
npm link
```

Now `apix` points at your local source. Any change you make is reflected immediately — no rebuild step.

To unlink later:

```bash
npm unlink -g apix-cli
```

## Roadmap

- [ ] `--env` flag to switch between saved environments (dev/staging/prod)
- [ ] `apix delete <name>` to remove a saved request
- [ ] Export/import a collection as a shareable JSON file
- [ ] Request chaining (use a response field as input to the next request)
- [ ] `--watch` mode to poll an endpoint on an interval

## Contributing

Issues and pull requests are welcome. If you're proposing a larger feature, open an issue first to discuss the approach before writing code.

## License

MIT
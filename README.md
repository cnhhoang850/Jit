# Custom Git-Like CLI

This project implements a basic Git-like command-line interface (CLI) in JavaScript. It provides functionalities such as initializing a repository, cloning a repository, creating commits, and manipulating Git objects.

## Installation

To use this CLI tool, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/custom-git-like-cli.git
   cd custom-git-like-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

The CLI supports the following commands:

- `init`: Initialize a new Git repository in the current directory.
   ```bash
   node index.js init
   ```

- `cat-file <hash>`: Display information about a Git object.
   ```bash
   node index.js cat-file <hash>
   ```

- `hash-object <file>`: Compute the Git hash of a file.
   ```bash
   node index.js hash-object <file>
   ```

- `ls-tree <hash>`: List the contents of a tree object.
   ```bash
   node index.js ls-tree <hash>
   ```

- `write-tree`: Create a tree object from the current directory's contents.
   ```bash
   node index.js write-tree
   ```

- `commit-tree <treeSHA> -p <parentSHA> -m <message>`: Create a new commit object.
   ```bash
   node index.js commit-tree <treeSHA> -p <parentSHA> -m <message>
   ```

- `clone <repoURL> <directory>`: Clone a repository into a new directory.
   ```bash
   node index.js clone <repoURL> <directory>
   ```

Replace `<hash>`, `<file>`, `<treeSHA>`, `<parentSHA>`, `<message>`, `<repoURL>`, and `<directory>` with appropriate values.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this template further based on your specific project details and preferences.

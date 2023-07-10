import os
import fnmatch
from pathlib import Path

output_filename = "combined_output.txt"

def read_gitignore():
    ignored_patterns = ['.git/**', '*/__pycache__/*', '*.cpython-*.pyc', 'combine_files.py', 'combined_output.txt']
    with open(".gitignore", "r", encoding="utf-8") as gitignore_file:
        for line in gitignore_file:
            pattern = line.strip()
            if pattern and not pattern.startswith("#"):
                ignored_patterns.append(pattern)
    return ignored_patterns

def is_gitignored(file_path, ignored_patterns):
    file_path = Path(file_path)

    # Ignore .git folder and its contents
    if ".git" in file_path.parts:
        return True

    # Ignore __pycache__ folder and its contents
    if "__pycache__" in file_path.parts:
        return True

    for pattern in ignored_patterns:
        # Convert the pattern to a Path object
        pattern_path = Path(pattern)
        # Use the glob method to match the file path
        matches = list(pattern_path.parent.glob(pattern_path.name))
        for match in matches:
            if match in file_path.parents or match == file_path:
                return True
    return False

def process_file(file_path, output_file):
    with open(file_path, "r", encoding="utf-8") as input_file:
        content = input_file.read()
        output_file.write("```" + ("\n" if not content.startswith("python") else "python\n"))
        output_file.write(content)
        output_file.write("\n```\n\n")

ignored_patterns = []

with open(output_filename, "w", encoding="utf-8") as output_file:
    for root, dirs, files in os.walk("."):
        # Remove ignored directories from traversal
        dirs[:] = [d for d in dirs if not is_gitignored(os.path.join(root, d), ignored_patterns)]

        for file in files:
            file_path = os.path.join(root, file)
            relative_file_path = os.path.relpath(file_path, start=".")
            if (file.endswith(".js") or file.endswith("requirements.txt")) and not is_gitignored(relative_file_path, ignored_patterns):
                output_file.write(f"{relative_file_path}:\n")
                process_file(file_path, output_file)

print(f"Combined output written to {output_filename}.\n")

def print_structure(path, indent=0, output_file=None):
    for root, dirs, files in os.walk(path):
        # Filter out ignored directories
        dirs[:] = [d for d in dirs if not is_gitignored(os.path.join(root, d), ignored_patterns)]

        level = root.replace(path, '').count(os.sep)
        indent = ' ' * 4 * (level)
        print_line = f"{indent}{'├──' if level > 0 else ''}{os.path.basename(root)}/"
        if output_file:
            output_file.write(print_line + "\n")
        else:
            print(print_line)
        sub_indent = ' ' * 4 * (level + 1)

        # Filter out ignored files
        files = [f for f in files if not is_gitignored(os.path.join(root, f), ignored_patterns)]

        for file in sorted(files):
            print_line = f"{sub_indent}├──{file}"
            if output_file:
                output_file.write(print_line + "\n")
            else:
                print(print_line)

with open(output_filename, "a", encoding="utf-8") as output_file:
    output_file.write("Application structure:\n")
    print_structure(".", indent=0, output_file=output_file)

print("Application structure added to combined_output.txt.")
#!/usr/bin/python3
"""
Log Parsing

This script parses log data from the standard input and prints metrics about the log data.
The metrics include the total file size and the count of each status code.

The script counts the number of lines of log data read from the standard input and
prints the metrics every 10 lines. If a KeyboardInterrupt (e.g. `Ctrl + C`) is received,
the metrics are printed and the script terminates.
"""
import sys

def print_metrics(file_size, status_codes):
    """
    Print the log metrics

    Arguments:
    - file_size: the total file size of the log data
    - status_codes: a dictionary with the count of each status code
    """
    print("File size: {}".format(file_size))
    codes_sorted = sorted(status_codes.keys())
    for code in codes_sorted:
        if status_codes[code] > 0:
            print("{}: {}".format(code, status_codes[code]))

# Initialize the count of each status code
codes_count = {
    '200': 0,
    '301': 0,
    '400': 0,
    '401': 0,
    '403': 0,
    '404': 0,
    '405': 0,
    '500': 0
}
file_size_total = 0
count = 0

if __name__ == "__main__":
    try:
        # Parse log data from standard input
        for line in sys.stdin:
            try:
                status_code = line.split()[-2]
                if status_code in codes_count.keys():
                    codes_count[status_code] += 1
                # Grab file size
                file_size = int(line.split()[-1])
                file_size_total += file_size
            except Exception:
                pass
            # print metrics if 10 lines have been read
            count += 1
            if count == 10:
                print_metrics(file_size_total, codes_count)
                count = 0
    except KeyboardInterrupt:
        print_metrics(file_size_total, codes_count)
        raise
    print_metrics(file_size_total, codes_count)

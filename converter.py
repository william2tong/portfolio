import csv 
import json

def main():
    data = []
    with open("Work Samples Spreadsheet - Sheet1.csv", "r") as f:
        
        reader = csv.DictReader(f)
        for row in reader:
            data.append(row)
    with open("work_samples.json", "w") as f:
        json.dump(data, f)
    return

if __name__ == "__main__":
    main()
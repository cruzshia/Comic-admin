# Account information

Secret information and configuration related to Raise_Server managed in Google spreadsheet ([for dev](https://docs.google.com/spreadsheets/d/1LbZ96ONL4gMCskFYui_4GGB21WwjYzPJ3xZh_QbUQIM/edit?usp=sharing)).

The sheet has the following columns:

- `Object` describes what this information relates to
- `ID` is an identifier of account or the like
- `Password` is secret information associated with `ID`
- `Config` is configuration to be stored to Antikythera's GearConfig and/or AWS Secrets Manager
    - **Data in the spreadsheet must be master data**; in other words, Antikythera's GearConfig and AWS Secrets Manager must follow the spreadsheet
    - The format is `"<key>": <value>`; see the following examples:
        - API token key (`key=api_token_key`, `value="****************"`)
          ```
          "api_token_key": "****************"
          ```
        - DB configuration (`key=db`, `value={ ... }`)
          ```
          "db": {
            "username": "xxx",
            "password": "yyy",
            "hostname": "zzz",
            "database": "postgres",
            "ssl": true
          }
          ```
- `Antikythera` accepts `必要` or `不要`; if `Config` exists and it is required for Antikythera, choose `必要`
- `AWS Batch` accepts `必要` or `不要`; if `Config` exists and it is required for AWS Batch, choose `必要`
- `Notes`

## What you must do when add/update information

If you change `Config` column, it is your responsibility to update Antikythera's GearConfig and/or AWS Secrets Manager accordingly.
Note that since the spreadsheet is master, you need to update it first of all.
If you don't have write permission of the spreadsheet, you should ask it of the owner or ask someone who has the permission to update the spreadsheet.

TODO: the following becomes effective after setting up AWS Batch environment at RA-4243

Note that you must update both Antikythera's GearConfig and AWS Secrets Manager when both `Antikythera` and `AWS Batch` column are `必要`.
About how to update AWS Secrets Manager, please see [here](aws_batch/aws_resources.md#how-to-update-secret).

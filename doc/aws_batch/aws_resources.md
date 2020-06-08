# AWS resources related to AWS Batch

## AWS Batch

## AWS Secrets Manager

### ARN of Secret

- dev: TBD (RA-4243)

### How to update Secret

Since AWS Secrets Manager accepts only *string* key/value pairs, you may wonder how to set an object value such as the following DB configuration.

```
"db": {
  "username": "xxx",
  "password": "yyy",
  "hostname": "zzz",
  "database": "postgres",
  "ssl": true
}
```

Nothing special; you just copy from `{` to `}` and paste it to Secert's form as follow.

![How to set an object value to AWS Secrets Manager](image/how_to_set_object_value_to_secrets_manager.png)

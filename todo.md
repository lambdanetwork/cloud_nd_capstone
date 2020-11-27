Now

1. configure schema table
   - session table TDONE
   - user table TDONE
   - payment table
2. create S3 bucket
   - user photo bucket TDONE
   - session photo bucket TDONE
3. configure each API in serverless.yml TDONE
4. test validator for each request TDONE
5. connect to repository TDONE

future

1. update authorizer to use custom auth0 (hook require us to pay, so just let the client hit /createUser manually)
2. remove validator from API gateway, it's easier to control at lambda level

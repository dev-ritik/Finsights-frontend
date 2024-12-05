# Finsights Frontend
Frontend for the Finsights project written React js, deployed on GitHub pages.

## Deploy
### Deploy to Github pages
`npm run deploy`
### Deploy using nginx
- `npm run deploy`
- Ssh to the env and checkout gh-pages branch
- Use this directive in nginx server block

```
location / {
  alias /home/azureuser/Finsights-frontend/;
}
```

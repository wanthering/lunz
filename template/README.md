# <%= name %>

> <%= description %>

## Usage
<% if (linter) { %>
### Lint File
```bash<% if (pm === 'yarn') { %>
yarn lint<% } %><% if(pm === 'npm') { %>
npm run lint<% } %>
```
<% } %><% if (test) { %>
### Test File
```bash
<%= pm %> test
```
<% } %>
### Build File
```bash<% if (pm === 'yarn') { %>
yarn build<% } %><% if(pm === 'npm') { %>
npm run build<% } %>
```

## Contributing
1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## Author

<%= name %> &copy; <%= author %>, Released under the MIT License.

> GitHub [@<%= author %>](https://github.com/<%= author %>)

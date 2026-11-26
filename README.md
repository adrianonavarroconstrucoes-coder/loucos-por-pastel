# Loucos por Pastel · Comanda digital

- App da loja: https://loucosporpastel.github.io/
- Pedido do cliente: https://loucosporpastel.github.io/pedido/
- Tutorial: https://loucosporpastel.github.io/tutorial/

App de cardápio e comanda (garçom + cozinha) do Loucos por Pastel Trailer.

## Arquivos
- `index.html`: o app completo (garçom, cozinha e administrador)
- `img.js`: logo e fotos do cardápio
- `config.js`: configuração do Firebase (banco de dados em tempo real)
- `firestore.rules`: regras do banco para colar no Firebase

## Colocar no ar (GitHub Pages)
1. Envie estes arquivos para a raiz do repositório `loucos-por-pastel`.
2. Settings > Pages > Source: "Deploy from a branch", branch `main`, pasta `/ (root)`.
3. O endereço será `https://<usuario>.github.io/loucos-por-pastel/`.

## Ligar o banco de dados (Firebase)
1. console.firebase.google.com > Criar projeto.
2. Build > Firestore Database > Criar banco (modo produção, região southamerica-east1).
3. Aba Regras: cole o conteúdo de `firestore.rules` e publique.
4. Configurações do projeto > Seus apps > Web (`</>`): copie o objeto de configuração para `config.js`.

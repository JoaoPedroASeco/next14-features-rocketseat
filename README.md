# ROTAS

## Definição das rotas

- As rotas são definidas apartir da pasta /app; Você pode definir rotas criando pastas dentro da /app como por exemplo /catalog que pode ser acessada htpp://localhost:3000/catalog.

/catalog

```jsx
const Catalog = () => {
  return <div>Catalog</div>;
};
```

## Layout personalizado para cada pagina

- O nextjs permite que voce tenha diferentes layouts para cada pagina, por exemplo: se voce criar uma pasta /catalog e dentro dessa pasta criar um layout.jsx todas todas as paginas seguintes incluindo a /catalog herdarão o conteudo do layout.

```jsx
const CatalogLayout = ({ children }: ...) => {
  return (
    <div>
      {/* Outros Componentes */}
      <Header>
      {children}
      <Footer>
      {/*Outros Componentes*/}
    </div>
  )
}
```

## Grupos e rotas dinâmicas

- Para criar agrupamento de rotas basta criar uma pasta com um nome por exemplo /auth e dentro dessa pasta criar routas agrupadas para auth como /signin, /login, /dashboard, etc... assim as rotas dentro de /auth ficaraão agrupadas; Essas paginas poderão ser acessadas atravez do http://localhost:3000/auth/signin por exemplo.

- Dessa forma eu posso utilizar sistemas de loading e layouts compartilhados para esse grupo de paginas objetivamente

- Outra forma de criar um agrupamente de paginas sem que afete na url é criar uma pasta com o nome em colchetes como por exemplo /(auth) e dentro dessa pasta as paginas subsequentes, voce podera acessar as mesmas paginas por essa url http://localhost:3000/signin

## Rotas dinamicas

- Para criar rotas dinamicas é necessario criar uma pasta /[id] que ira receber apenas o parametro id;

http://localhost:3000/products/1

```jsx
interface PageProps {
  params: {
    id: string,
  };
}

const Page = ({ params: { id } }: PageProps) => {
  return <div>Parametro Id: {id}</div>;
};

export default Page;
```

- Agora para capturar mais de um parametro por vez voce pode criar uma rota com o nome [...data]; Nesse exemplo voce vai receber um array de strings com cada parametro

http://localhost:3000/products/1/2/3

```jsx
interface PageProps {
  params: {
    data: string[],
  };
}

const Page = ({ params: { data } }: PageProps) => {
  return (
    <div>
      Parametros:{" "}
      {data.map((item) => (
        <div>item</div>
      ))}
    </div>
  );
};

export default Page;
```

# Server commponents e Client components

- Server components: Por padrão todos os components criados são server components, ou seja, são contruidos pelo lado do servidor estaticamente para que não seja enviado javascript para o browser; Toda e qualquer pagina que tenha interação do usuario é Client component.

- Client components: São components que enviam javascript para o browser; Todos os components que utilizam de interação para o usuario precisam ter "use client" no topo do arquivo, como por exemplo contextos, botões que executam funções; Para utilizar Hooks do React tambem é necessario utilizar "use client" no topo do arquivo, sendo assim tranformados em Client components;

- Atualmente nas novas features do nextjs você pode tranfroamr o componente pai /page.jsx como async para que a pagina espere o fetch até que seja mostrado para o usuario, sendo assim necessario mas não obrigatorio haver um arquivo loading.jsx na raiz da page.jsx que sera exibido toda vez que o fetch ainda não estiver concluido; Por sua vez esse loading poderá ser compartilhado para as paginas seguintes a essa em qustão.

# Suspense API do React

- O next por padrão espera todas e quaisquer requisições serem finalizadas para que seja exibido os dados requisitados; Em casos especificos isso pode fazer com que o usuario veja por bastante tempo o componente de loading sendo exibido.

- O componente Suspense fornecido pelo React ja existe algum tempo, porêm com essas novas features do Nextjs esta sendo mais utilizado; A função desse componente é fazer com que Server components que possuem fetch possam ser carregados a parte, mostrando seu loading até que eles sejam concluidos sem afetar a renderização dos outros components.

- Com isso, voce poderá exibir todos os outros conteudos estaticos para o cliente antes que os fetchs terminem.

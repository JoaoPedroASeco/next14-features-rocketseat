# ROTAS

## Definição das rotas

- As rotas são definidas apartir da pasta /app; Você pode definir rotas criando pastas dentro da /app como por exemplo /catalog que pode ser acessada htpp://localhost:3000/catalog.

/catalog

```tsx
const Catalog = () => {
  return <div>Catalog</div>;
};
```

## Layout personalizado para cada pagina

- O nextjs permite que voce tenha diferentes layouts para cada pagina, por exemplo: se voce criar uma pasta /catalog e dentro dessa pasta criar um layout.tsx todas todas as paginas seguintes incluindo a /catalog herdarão o conteudo do layout.

```tsx
const CatalogLayout = ({ children }: ...) => {
  return (
    <div>
      {/* Outros Componentes */}
      <Header>
      {children}
      <Footer>
      {/*Outros Componentes*/}
    </div>
  )'
}
```

## Grupos e rotas dinâmicas

- Para criar agrupamento de rotas basta criar uma pasta com um nome por exemplo /auth e dentro dessa pasta criar routas agrupadas para auth como /signin, /login, /dashboard, etc... assim as rotas dentro de /auth ficaraão agrupadas; Essas paginas poderão ser acessadas atravez do http://localhost:3000/auth/signin por exemplo.

- Dessa forma eu posso utilizar sistemas de loading e layouts compartilhados para esse grupo de paginas objetivamente

- Outra forma de criar um agrupamente de paginas sem que afete na url é criar uma pasta com o nome em colchetes como por exemplo /(auth) e dentro dessa pasta as paginas subsequentes, voce podera acessar as mesmas paginas por essa url http://localhost:3000/signin

## Rotas dinamicas

- Para criar rotas dinamicas é necessario criar uma pasta /[id] que ira receber apenas o parametro id;

http://localhost:3000/products/1

```tsx
interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: PageProps) => {
  return <div>Parametro Id: {id}</div>;
};

export default Page;
```

- Agora para capturar mais de um parametro por vez voce pode criar uma rota com o nome [...data]; Nesse exemplo voce vai receber um array de strings com cada parametro

http://localhost:3000/products/1/2/3

```tsx
interface PageProps {
  params: {
    data: string[];
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

- Atualmente nas novas features do nextjs você pode tranfroamr o componente pai /page.tsx como async para que a pagina espere o fetch até que seja mostrado para o usuario, sendo assim necessario mas não obrigatorio haver um arquivo loading.tsx na raiz da page.tsx que sera exibido toda vez que o fetch ainda não estiver concluido; Por sua vez esse loading poderá ser compartilhado para as paginas seguintes a essa em qustão.

# Suspense API do React

- O next por padrão espera todas e quaisquer requisições serem finalizadas para que seja exibido os dados requisitados; Em casos especificos isso pode fazer com que o usuario veja por bastante tempo o componente de loading sendo exibido.

- O componente Suspense fornecido pelo React ja existe algum tempo, porêm com essas novas features do Nextjs esta sendo mais utilizado; A função desse componente é fazer com que Server components que possuem fetch possam ser carregados a parte, mostrando seu loading até que eles sejam concluidos sem afetar a renderização dos outros components.

- Com isso, voce poderá exibir todos os outros conteudos estaticos para o cliente antes que os fetchs terminem.

# Cache e Memoização

- Memoização é uma função do React como por exemplo useMemo que tem por funcinalidade calcular alguma funcionalidade apenas uma vez e guardar em cache o resultado para que não precise calcular multiplas vezes quando o codigo é re-compilado.

- Cache basicamente é bastante parecido com Memoização, porem, se trata de armazenar informações vindas do banco de dados, isso significa previnir que a aplicação faça requisições desnecessarias ao banco de dados.

- O Next extende a Web Fetch API para que seja otimizado para o next com o objetivo guardar o resultado de uma requisição durante um certo tempo pré-determinado para que quando o usuario requisite novamente essa chamada, o resultado fique arrmazenado e pronto para consumo.

### Memoização e Cache no Nextjs

- Em um Server component qualquer, seja em React puro e principalmente no Nextjs, todas as requisições feitas pela Web Fetch API que tiverem configuradas corretamente serão 'cacheadas', ou seja, independente do lugar da aplicação, se essa mesma requisição for feita, ela não buscara novos dados, apenas utilizara os dados ja obtidos na primeira busca; Os dados persistirão durante o tempo definido nas configurações do Web Fetch API.

```tsx
// ...
const fetchSomeData = async () => {
  const response = await fetch("https://api_url/address", {
    cache: "force-cache", // "default", "no-cache", "force-cache", "no-store", "reload" and "only-if-cached";
    next: {
      revalidate: 60 * 60, // number of seconds
    },
  });

  const data = await response.json();

  return data;
};
// ...
```

#### cache: "no-store"

- Essa opção fará com que todas requisições feitas busquem novos dados, isso significa não guardar nenhum resultado em cache;

#### cache: "force-cache"

- Essa opção fará com que sejam guardados em cache todos os resultados obtidos pela requisição pelo tempo determinado pelo revalidate.

# SEO e metadata

- Cada pagina page.tsx pode receber uma constante chamada metadata que é identificada pelo nextjs como informações da pagina que serão exibidas para o usuario no navegador e tambem mostrada no embed do link diponibilizado da pagina.

- Exemplo de Metadata:

```tsx
// page.tsx
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "page tiitle",
  description: "page description",
};

export default function Page() {
  ...
}
```

## Metadata personalizado

```tsx
// page.tsx
import type { Metadata } from "next";

const metadata: Metadata = {
  title: {
    template: "% | page title",
    default: "page title",
  },
};

export default function Page() {
  ...
}
```

- Aqui a pagina recebera o nome da pagina como primeiro nome e logo após recebera a propriedade template, por exemplo, será exibido para o cliente: "Page | page title".

## Metadata dinâmico

```tsx
async function getProductBySlug(slug: string): Promise<ProductProps> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });

  const products = await response.json();

  return products;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  return {
    title: product.title,
  };
}
```

- Aqui voce consegue colocar uma configuração dinâmica para o metadata, como por exemplo o nome de um produto especifico.

# Geração estatica - Server Side Generation

```tsx
export default function generateStaticParams() {
  return [{ slug: "moletom-never-stop-learning" }];
}
```

- Essa função tem a responsabilidade de gerar estaticamente a pagina com slug /moletom-never-stop-learning no momento do build do projeto.

# SEO/Metadata - Opengraph image

- A funcionalidade de Opengraph image permite que no compartilhamento do link da pagina seja exibido uma imagem especifica referente a pagina.

```tsx
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const interSemiBold = fetch(
    new URL("./Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        About Acme
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
```

- O next nos da a possibilidade de renderizar dinamicamente um Opengraph especifico para cada produto por exemplo.

```tsx
import { api } from "@/data/api";
import { ProductProps } from "@/data/types/products";
import { env } from "@/env";
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";
// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Product Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getProduct(slug: string): Promise<ProductProps> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15,
    },
  });

  const product = await response.json();

  return product;
}

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={productImageURL} alt="" style={{ width: "100%" }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
```


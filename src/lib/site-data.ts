import { Lightbulb, Ruler, Wrench, Sparkles } from "lucide-react";
import arvore2025 from "@/assets/arvore-do-rio-2025.jpg.asset.json";

export type Project = {
  name: string;
  slug: string;
  meta: string;
  tagline: string;
  desc: string;
  image?: string;
  imageAlt?: string;
  cardImage?: string;
  cardAlt?: string;
  photo?: string;
  photoW?: number;
  photoH?: number;
  extraImage?: string;
  extraAlt?: string;
  full?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Árvore do Rio",
    photo: arvore2025.url,
    photoW: 1920,
    photoH: 1080,
    slug: "arvore-do-rio",
    meta: "Natal · Desde 1996 / Lagoa Rodrigo de Freitas",
    tagline: "O Natal que flutua no coração da cidade.",
    desc: "A maior árvore de natal flutuante do mundo, na Lagoa Rodrigo de Freitas.",
    image: "/projetos/arvore-do-rio.png",
    imageAlt: "Logo da Árvore do Rio",
    cardImage: "/projetos/cards/card-arvore.webp",
    cardAlt: "Árvore de Natal flutuante iluminada na Lagoa Rodrigo de Freitas",
    extraImage: "/projetos/arvore-do-rio-foto.png",
    extraAlt: "Árvore de Natal flutuante iluminada na Lagoa Rodrigo de Freitas",
    full: "Uma produção mágica, que enche a gente de prazer e orgulho. Uma realização Backstage que, desde 1996, ajuda a fazer da Lagoa Rodrigo de Freitas uma referência do Natal brasileiro. Considerado o 3º maior evento do Rio de Janeiro (atrás apenas do Carnaval e do Réveillon), a Árvore do Rio já celebra 21 edições e se realiza graças à participação de 1200 profissionais, atraindo todos os anos mais de 1 milhão de pessoas para o entorno da Lagoa. A Árvore do Rio foi incluída no Guinness Book (1999 e 2007) como a maior árvore flutuante do mundo. Uma produção que envolve da parte artística ao mais alto grau de especialização em diversos campos da engenharia, inclusive naval — viabilizando a ideia de Roberto Medina com a concepção cenográfica de Abel Gomes.",
  },
  {
    name: "Corrida Todo Mundo Vai",
    photo: "/projetos/fotos/corrida.webp",
    photoW: 693,
    photoH: 870,
    slug: "corrida-todo-mundo-vai",
    meta: "Esporte · Desde 2019 / Aterro do Flamengo",
    tagline: "A atividade física mais democrática que existe.",
    desc: "Circuito de corridas de rua que movimenta o Rio.",
    image: "/projetos/corrida-todo-mundo-vai.png",
    imageAlt: "Logo do Circuito Todo Mundo Vai",
    cardImage: "/projetos/cards/card-corrida.webp",
    cardAlt: "Corredores no Aterro do Flamengo",
    full: "Com o objetivo de trazer de volta os verdadeiros corredores de rua — a atividade física mais democrática que existe, exigindo apenas vontade e um tênis no pé — foi criado o Circuito Todo Mundo Vai, para Lojas Americanas e Americanas.com. Com idealização e produção executiva da Backstage, o evento levou cerca de 6 mil pessoas ao Aterro do Flamengo numa manhã de maio de 2019. Voltado para toda a família e todas as classes sociais, já são 13 provas realizadas em 7 cidades — um evento seguro, bem organizado e de extrema qualidade, a um preço acessível.",
  },
  {
    name: "Disney Millenium",
    photo: "/projetos/fotos/disney.jpg",
    photoW: 1408,
    photoH: 944,

    slug: "disney-millenium",
    meta: "Entretenimento · 2000 / Baía de Guanabara",
    tagline: "Quando o Mickey escolheu o Rio.",
    desc: "Uma visita do Mickey Mouse à Baía de Guanabara.",
    image: "/projetos/disney-millenium.png",
    imageAlt: "Logo Disney Millenium",
    cardImage: "/projetos/cards/card-disney.webp",
    cardAlt: "Projeção do Mickey e bandeira brasileira no Pão de Açúcar",
    full: "Para a virada do milênio, a Disney criou um espetáculo grandioso e escolheu o Rio de Janeiro. A Backstage, empresa de eventos da Disney Events Latin America desde 1998, foi selecionada para a operação. No Pão de Açúcar, projeções em dimensões estratosféricas destacaram o Mickey e a bandeira brasileira; na Baía de Guanabara, fogos armados em balsas criaram um espetáculo de luzes, som, música e canhões de laser — pela primeira vez no Brasil, tudo sincronizado por computadores. A logística incluiu até o fechamento do aeroporto Santos Dumont. A Backstage recebeu o Troféu Mickey, dedicado a projetos de excelência — única produtora no Brasil a possuir um exemplar. Depois vieram a inauguração do Disney Channel (2001), shows da Disney na Super Casas Bahia (2005-2007), Shows do Mickey (2015 e 2017) e o lançamento do avião Star Wars Galaxy's Edge da Latam (2019).",
  },
  {
    name: "Ação Vote Cristo",
    photo: "/projetos/fotos/cristo.webp",
    photoW: 699,
    photoH: 684,
    slug: "vote-cristo",
    meta: "Mobilização · 2007 / Rio de Janeiro",
    tagline: "Ele é uma maravilha.",
    desc: "Mobilização que ajudou a eleger o Cristo Redentor uma das 7 Maravilhas do Mundo Moderno.",
    image: "/projetos/vote-cristo.png",
    imageAlt: "Logo da ação Vote Cristo",
    cardImage: "/projetos/cards/card-cristo.webp",
    cardAlt: "Cristo Redentor sob céu azul",
    extraImage: "/projetos/vote-cristo-foto.jpg",
    extraAlt: "Ação de rua da campanha Vote Cristo",
    full: "A campanha de eleição do Cristo Redentor como uma das Sete Maravilhas do Mundo Moderno foi um projeto da Bradesco Seguros com produção executiva da Backstage Produções. Com o conceito 'Vote Cristo. Ele é uma maravilha.', a campanha tomou a cidade com vans envelopadas e promotores uniformizados, divulgando o site e o telefone de votação. Lideranças, artistas e celebridades participaram da mobilização nacional. O objetivo foi alcançado: o Cristo Redentor, maior símbolo do Rio de Janeiro, foi eleito uma das Sete Maravilhas do Mundo Moderno.",
  },
  {
    name: "Festival Vale do Café",
    photo: "/projetos/fotos/vale.jpg",
    photoW: 1408,
    photoH: 944,

    slug: "festival-vale-do-cafe",
    meta: "Cultura · Desde 2003 / Vale do Paraíba",
    tagline: "Palacetes históricos como palco.",
    desc: "Festival cultural na região do Vale do Café fluminense.",
    image: "/projetos/vale-do-cafe.png",
    imageAlt: "Logo do Festival Vale do Café",
    cardImage: "/projetos/cards/card-vale.webp",
    cardAlt: "Apresentação musical do Festival Vale do Café",
    extraImage: "/projetos/vale-do-cafe-foto.jpg",
    extraAlt: "Apresentação musical do Festival Vale do Café",
    full: "Criado em 2003 para contribuir com um polo turístico cultural no interior do estado do Rio, o Festival Vale do Café divulga o patrimônio histórico e arquitetônico dos municípios do Vale do Paraíba. Idealizado por Cristina Braga, com direção artística de Turíbio Santos, tem praças, igrejas e fazendas históricas como cenário do maior festival de música da região. Em 2010 recebeu o Prêmio de Cultura do Estado do Rio de Janeiro na categoria Empreendedorismo. Em sua história, já impactou mais de 1 milhão de espectadores, com concertos de 10 mil artistas, e beneficiou mais de 4 mil alunos com cursos gratuitos de instrumentos e canto.",
  },
  {
    name: "Circuito Energia em Movimento",
    photo: "/projetos/fotos/energia.jpg",
    photoW: 1408,
    photoH: 944,
    slug: "circuito-energia-em-movimento",
    meta: "Esporte / Rio de Janeiro",
    tagline: "Movimento que vira qualidade de vida.",
    desc: "Circuito de eventos esportivos e de qualidade de vida.",
    cardAlt: "Participantes em atividades esportivas ao ar livre no Rio de Janeiro",

  },
];

export const NAV = [
  { label: "Projetos", to: "/", hash: "projetos" },
  { label: "Estúdio", to: "/estudio" },
  { label: "Contato", to: "/contato" },
] as const;

export const CONTACT = {
  address:
    "Avenida Armando Lombardi, 800 sl 313, Condado Cascais, Barra da Tijuca, Rio de Janeiro - RJ, CEP 22640-906",
  phone: "+55 21 96784-8349",
  phoneHref: "tel:+5521967848349",
  email: "backstage@backstage.art.br",
  instagram: "https://instagram.com/backstage.rio.producoes",
  facebook: "https://facebook.com/backstage.rio.producoes",
};

export const STEPS = [
  { n: "01", title: "Ideia", desc: "A matéria-prima de todo grande feito. Ouvimos, provocamos e desenhamos o conceito.", Icon: Lightbulb },
  { n: "02", title: "Projeto", desc: "Engenharia e arquitetura traduzem a ideia em plano executável, seguro e viável.", Icon: Ruler },
  { n: "03", title: "Produção", desc: "Equipe multidisciplinar coloca o projeto de pé, cuidando de cada detalhe operacional.", Icon: Wrench },
  { n: "04", title: "Experiência", desc: "O público vive o evento. Nossa métrica de sucesso é a memória que fica.", Icon: Sparkles },
];

export type Stat = { value: number; suffix?: string; prefix?: string; label: string };

export const STATS: Stat[] = [
  { value: 30, label: "anos de história" },
  { value: 2, suffix: "×", label: "no Guinness Book (Árvore do Rio, 1999 e 2007)" },
  { value: 1, suffix: "M+", label: "pessoas por ano na Lagoa" },
  { value: 1200, label: "profissionais em uma única produção" },
];

export const TIMELINE: { year: string; text: string; cta?: boolean }[] = [
  { year: "1996", text: "Primeira Árvore do Rio na Lagoa Rodrigo de Freitas." },
  { year: "1998", text: "Backstage torna-se a produtora da Disney Events Latin America." },
  { year: "2000", text: "Disney Millenium: Mickey na Baía de Guanabara e o Troféu Mickey." },
  { year: "2003", text: "Nasce o Festival Vale do Café." },
  { year: "2007", text: "Vote Cristo: o Cristo eleito uma das 7 Maravilhas do Mundo Moderno." },
  { year: "2019", text: "Circuito Todo Mundo Vai leva 6 mil pessoas ao Aterro." },
  { year: "Hoje", text: "Prontos para a próxima grande realização.", cta: true },
];

export const CLIENTS: { name: string; src: string }[] = [
  { name: "Petrobras", src: "/clientes/petrobras.svg" },
  { name: "Enel", src: "/clientes/enel.svg" },
  { name: "Naturgy", src: "/clientes/naturgy.svg" },
  { name: "Light", src: "/clientes/light.svg" },
  { name: "Furnas", src: "/clientes/furnas.svg" },
  { name: "Transpetro", src: "/clientes/transpetro.svg" },
  { name: "Sebrae", src: "/clientes/sebrae.svg" },
  { name: "Sesc", src: "/clientes/sesc.svg" },
  { name: "Senac", src: "/clientes/senac.svg" },
  { name: "Fundação Roberto Marinho", src: "/clientes/fundacao-roberto-marinho.svg" },
  { name: "Grupo CCR", src: "/clientes/grupo-ccr.svg" },
  { name: "Bradesco Seguros", src: "/clientes/bradesco-seguros.svg" },
  { name: "Americanas", src: "/clientes/americanas.svg" },
  { name: "Citroën", src: "/clientes/citroen.svg" },
  { name: "Land Rover", src: "/clientes/land-rover.svg" },
  { name: "Mapfre", src: "/clientes/mapfre.svg" },
  { name: "Cateno", src: "/clientes/cateno.svg" },
  { name: "Universidade", src: "/clientes/universidade.svg" },
];

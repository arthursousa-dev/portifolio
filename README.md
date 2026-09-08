# Portfólio — Arthur Sousa da Costa

Landing page pessoal, construída do zero (sem template/framework de UI) para apresentar projetos, formação e contato.

**Live:** https://arthursousa-dev.github.io/portifolio (ajustar se o deploy for em outro domínio)

## Stack

- HTML5 semântico
- CSS puro (custom properties, grid/flexbox, `prefers-reduced-motion`)
- JavaScript vanilla (sem dependências) — cursor customizado, barra de progresso de leitura, animações de entrada, marquee de tecnologias e contadores animados via `IntersectionObserver`

## Estrutura

```
.
├── index.html      # marcação e conteúdo das seções (hero, projetos, sobre, certificações, contato)
├── css/
│   └── style.css   # design tokens + estilos por seção
└── js/
    └── script.js   # interações (cursor, scroll, animações, marquee, contadores)
```

## Rodando localmente

Não há build step. Basta abrir `index.html` no navegador ou servir a pasta com qualquer servidor estático:

```bash
npx serve .
```

## Acessibilidade

O site respeita `prefers-reduced-motion` — animações de entrada, marquee e contador são desativados/simplificados quando o usuário tem essa preferência ativada no sistema.

## Contato

- E-mail: arthursousa.contatop@gmail.com
- LinkedIn: [/in/arthur-sousa-ads](https://www.linkedin.com/in/arthur-sousa-ads/)
- GitHub: [@arthursousa-dev](https://github.com/arthursousa-dev)

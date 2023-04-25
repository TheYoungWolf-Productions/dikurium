## Overview

This is a dummy project created to exercise usage of Next, React, MantineUI and GraphQL integrations. The basic idea is to fetch all repositories of a github user and be able to star/unstar arbitarily. 

## Requirements checklist

- [x] Create Next App in Typescript
- [x] Integrate Mantine UI with SSR
- [x] Initialize ApolloClient
- [x] Integrate Github GraphQL API
- [x] Implement a card format UI with relevant data
- [x] Show list of public repositories (of the user: [theYoungWolf](https://github.com/TheYoungWolf-Productions))
- [x] Show a list of starred repositories
- [x] Let user star/unstar repositories via mutations (Note, this currently works only for repos owned by theYoungWolf)
- [x] Enable SSR
- [x] Deploy to vercel
- [ ] Add GraphQL type generation with the Apollo CLI or GraphQL Codegen.
- [ ] Allow the user to search for repositories.
- [ ] Allow the user to search for users to list repositories.

## Future improvements

- [ ] Refactor code to separate user flow from user interface i.e., remove inline styling, further decompose components
- [ ] Error handling
- [ ] Handle loading states in a seamless manner with spinners.
- [ ] Increase fidelity by including popups, modals, toasts and further leveraging in-built Mantine UI components.
- [ ] Add auth via github feature

## Demo 

Visit the demo hosted on [Vercel](https://www.google.com)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

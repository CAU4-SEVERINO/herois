import { createContext, useContext, useState } from 'react';

export type Hero = {
  id: number;
  nome: string;
  classe: string;
  estrelas: number;
  icone: string;
  fotoUri?: string;
};

type HeroContextType = {
  herois: Hero[];
  adicionarHeroi: (heroi: Omit<Hero, 'id'>) => void;
  editarHeroi: (id: number, heroi: Omit<Hero, 'id'>) => void;
  excluirHeroi: (id: number) => void;
};

const HeroContext = createContext<HeroContextType>(
  {} as HeroContextType
);

export function HeroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [herois, setHerois] = useState<Hero[]>([]);

  function adicionarHeroi(heroi: Omit<Hero, 'id'>) {
    const novoHeroi: Hero = {
      id: Date.now(),
      ...heroi,
    };

    setHerois((lista) => [...lista, novoHeroi]);
  }

  function editarHeroi(
    id: number,
    heroi: Omit<Hero, 'id'>
  ) {
    setHerois((lista) =>
      lista.map((item) =>
        item.id === id ? { id, ...heroi } : item
      )
    );
  }

  function excluirHeroi(id: number) {
    setHerois((lista) =>
      lista.filter((item) => item.id !== id)
    );
  }

  return (
    <HeroContext.Provider
      value={{
        herois,
        adicionarHeroi,
        editarHeroi,
        excluirHeroi,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
}

export function useHerois() {
  return useContext(HeroContext);
}
//esse aqui eu tive que ir pesquisar para saber como fazer com que os herois pudessem ser adicionados e editados, então eu criei um contexto para isso, e criei uma função para adicionar e outra para editar, e passei essas funções como valor do contexto, e depois usei o hook useContext para poder usar essas funções em qualquer componente que esteja dentro do provider.

//fora que eu instalei um image picker para poder escolher a foto do heroi, e usei o expo-image-picker para isso, e criei uma função para pegar a foto e salvar no estado do heroi, e depois passei essa função como valor do contexto, e depois usei o hook useContext para poder usar essa função em qualquer componente que esteja dentro do provider.
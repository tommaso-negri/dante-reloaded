# dante-reloaded

# Istruzione per lo sviluppo

## Installazione
Prima di iniziare occorre scaricare un paio di cose

### 1. Clona questa repository:
Aprire il terminale e navigare nella directory dove si vuole salvare il progetto

E.G:

```cd Desktop/``` oppure creare una nuova directory con ```mkdir Desktop/Code``` e successivamente ```cd Desktop/Code```

A questo punto clonare la repository con il comando e navigarci all'interno

```
git clone https://github.com/tommaso-negri/dante-reloaded.git

cd dante-reloaded/
```

### 2. Installare Node.js

https://nodejs.org/en/

*Solo se non lo si ha già installato!*

### 3. Installare Yarn (Package Manager)

Lanciare il comando per l'installazione di yarn da terminale

```npm install yarn -g```

### 4. Installare dependencies

Lanciare il comando per l'installazione delle dependencies

```yarn```


## Comandi per lo sviluppo
Tramite terminale una volta posizionatisi nella cartella di sviluppo...

E.G:

```cd Desktop/Code/dante-reloaded```

Si potranno utilizzare dei comandi utili allo sviluppo

### Development Mode
Con il comando ```yarn start``` si avvierà il server di sviluppo con funzioni di reset della cache, ottimizzazioni del codice e livereload della pagina. Inoltre il browser verrà avviato automaticamente all'indirizzo corretto.

**N.B:** il terminale fintanto che il server è in funzione dovrà restare aperto.

Per terminare l'esecuzione del server si può sul terminale la combinazione di tasti

```ctrl + c```

### Build Mode
Con il comando ```yarn build``` si può realizzare una build del gioco pronta per il deploy. La directory da andare poi a caricare sul server in questo caso è ```/build```

**N.B:** questa modalità serve solo per testing e deploy finale del gioco, non è adatta allo sviluppo.

### Clear Mode
É buona norma prima di lanciare il comando ```yarn build``` andare a ripulire la directory da precedenti build del gioco, è possibile fare ciò con il comando ```yarn clear```

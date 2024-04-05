# Nerdz-Ng

Nerdz-Ng è un semplice social network basato sulle APIs del social network Nerdz ([link APIs](https://api.nerdz.eu/docs])). 

Per il front-end è stato scelto Angular e per il back-end Python con il modulo Flask per gestire il recupero del token con il protocollo Oauth2.

Il progetto è diviso in due cartelle una per la parte front-end dell'applicazione (Angular) ed una per la parte back-end (python proxy)

Al momento il progetto non è ancora stato rilasciato ed è disponibile solo localmente.

## Front-end
Il front-end è sviluppato tramite il framework angular. Ecco alcune caratteristi principali:

    * Carbon Design System è il fondamento grafico e visuale di Nerdz Ng. Grazie a questo Nerdz Ng è disponibile in tema nero e bianco.
    * to be continued...

# Back-end
Il back-end è sviluppato in python con l'aiuto del framework Flask, queste le sue funzioni principali

    * fungere da proxy per le api esposte su api.nerdz.ru
    * autenticare l'utente e ottenere l'access_token tramite il protocollo oauth2 (logica di refresh non ancora funzionante)
    * to be continued...
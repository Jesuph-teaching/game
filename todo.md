# TODO list of elements to revise

1.  update the game state in the slice

    - create initial state
    - load username and room from sessionStorage
    - create a slice with a reducer
    - create a store reducer:
      - PlayerLoggedOut: clear username and room from sessionStorage
      - PlayerLoggedIn: set cards from payload & save username and room to sessionStorage & set roomId from payload
      - SetPlayerName: set username from payload
      - GameUpdated: update gameState from payload
      - SelectCard: set selectedCard from payload
      - SetMode: switch mode if canSwitchMode is true

2.  create SocketConnection that implements SocketInterface:

    note:

        - connect: connect to the server
        - disconnect: disconnect from the server
        - on: listen to an event
        - emit: send an event
        - using SocketEvent as events types

    - on connect: dispatch connectionEstablished
    - on disconnect: dispatch connectionLost
    - on error: dispatch connectionError
    - events after connection:
      - on GameUpdated: dispatch gameUpdated with gameState
      - on PlayerLoggedIn: dispatch playerLoggedIn with cardsCollection and roomId
      - on PlayerLoggedOut: dispatch playerLoggedOut
      - on PlayerWon: toast playerWon
      - on PlayerLost: toast playerLost
      - on Error: toast error

3.  Generate middleware that matches the action type and calls the reducer with the sockets events:

    - initSocket: connect to the server by creating a new SocketConnection with SocketFactory
    - emit joinRoom: emit joinRoom with roomId and game.currentPlayer
    - emit createRoom: emit createRoom with game.currentPlayer and selected cardCollectionId
    - emit LeaveRoom: emit leaveRoom from requestLogOut
    - emit removeCard: emit removeCard with cardId
    - emit chooseCard: emit chooseCard with cardId
    - emit PassedTurn: emit passedTurn if current player is the player
    - emit addCard: emit addCard with cardId
    - emit guessCard: emit guessCard with cardId
    - emit restartGame: emit restartGame

4.  Routing:

    - create a route for the welcome page (redirected from /)
    - create a route for the join-room page
    - create a route for the create-room page
    - create a route for the game page

5.  Load Cards in Create room

    - create the fetch request function in api/requests/cards.ts
    - use react query to fetch cards from the server
    - add loading screen
    - add error screen

<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ChrisCoastal/cribbage-monster">
    <img src="src/assets/logo/readme-logo.jpg" alt="Logo">
  </a>
    <p align="center">
      A two player online version of the classic card game.
    <br />
    </p>

  <h3 align="center">
    <a href="https://cribbage.netlify.app/" target="blank">
      Explore a live demo here »
    </a>
  </h3>

  <p align="center">
    <br />
    <br />
    Thanks for giving this project a star! ⭐️
    <br />
    <a href="https://github.com/ChrisCoastal/cribbage-monster/issues">Report Bug</a>
    ·
    <a href="https://github.com/ChrisCoastal/cribbage-monster/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#play">Game</a>
      <ul>
        <li><a href="#play">Play</a></li>
        <li><a href="#learn">Learn</a></li>
      </ul>
    </li>
    <li><a href="#project">Project</a>
      <ul>
        <li><a href="#inspiration">Inspiration</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Cribbage Monster is an online version of the classic card game. The app is built with React and uses Firebase Realtime Database for storage and providing updates to clients via websocket.

[![Product Name Screen Shot][product-screenshot]](https://cribbage.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React 18](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [React Router 6.4](https://reactrouter.com/en/main)
- [Anime.js](https://animejs.com/)
- [Tailwind](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Play -->

## Game

<p align="center">
  <img src='src/assets/screenshots/game-view.jpg' width="300px" >
</p>

### Play

You can check out the live playable version at <a href="https://cribbage.netlify.app/" target="_blank">Cribbage Monster</a>.

### Learn

Don't know how to play? Cribbage is a great card game! You can start here with learning the <a href="https://cribbage.netlify.app/rules" target="_blank">Rules of Crib</a>.

## Project

### Inspiration

Cribbage Monster started with the idea of building a small app as a holiday gift for relatives (notably my Dad), so that we can enjoy the family pastime when we aren't together.

### Build

### Features

Some highlights from what I wanted to accomplish and include in the project:

- create a multipage app with auth protected routing
- subscribing clients to a backend via websocket for multiplayer gameplay
- experiment with svg animations

### Learning

I've had some great expected and unexpected learning moments while building this project.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

There is still more work and ideas I would love to add (or go back and change 😅), but I'm happy with where the project is at in terms of what I set out to make and am excited move on to other projects.

- [x] block out pages and routing
- [x] Firebase auth
- [x] block out game play UI
- [x] game logic
- [x] read/write game and app context from Firebase backend
- [x] websocket subscription for in game clients
- [x] game cleanup via cloud functions
- [x] flush out UI
- [ ] presence for users in game
- [ ] custom avatar illustrations
- [ ] expand game play options
- [ ] computer opponent(s)
- [ ] ... 🏁

See the [open issues](https://github.com/ChrisCoastal/cribbage-monster/issues) for a list of open issues.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make Cribbage Monster better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

ChrisCoastal: contactchriscoastal@gmail.com 🌊

Project Link: [https://github.com/ChrisCoastal/cribbage-monster](https://github.com/ChrisCoastal/cribbage-monster)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- Thank you to anyone responsible for the libraries, packages, and other code that has made this project posible. 🙏

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ChrisCoastal/cribbage-monster.svg?style=for-the-badge
[contributors-url]: https://github.com/ChrisCoastal/cribbage-monster/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ChrisCoastal/cribbage-monster.svg?style=for-the-badge
[forks-url]: https://github.com/ChrisCoastal/cribbage-monster/network/members
[stars-shield]: https://img.shields.io/github/stars/ChrisCoastal/cribbage-monster.svg?style=for-the-badge
[stars-url]: https://github.com/ChrisCoastal/cribbage-monster/stargazers
[issues-shield]: https://img.shields.io/github/issues/ChrisCoastal/cribbage-monster.svg?style=for-the-badge
[issues-url]: https://github.com/ChrisCoastal/cribbage-monster/issues
[license-shield]: https://img.shields.io/github/license/ChrisCoastal/cribbage-monster.svg?style=for-the-badge
[license-url]: https://github.com/ChrisCoastal/cribbage-monster/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/christopher-allen-3194371b5
[product-screenshot]: src/assets/game-view-partial.jpg

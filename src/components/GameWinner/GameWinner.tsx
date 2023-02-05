import React, { FC } from 'react';

import { AvatarSize, PlayerPos } from 'src/@types';
import Particles from 'react-particles';
import type { Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import Avatar from 'src/components/Avatar/Avatar';
import useGameContext from 'src/hooks/useGameContext';

import { isWinner } from 'src/utils/helpers';
import Heading from '../UI/Heading';
import Button from '../UI/Button';
type GameWinnerProps = {
  playerIsWinner: boolean;
  winner: { displayName: string; avatar: string };
  quitHandler: () => void;
  playHandler: () => void;
};

const GameWinner: FC<GameWinnerProps> = ({ playerIsWinner, winner, quitHandler, playHandler }) => {
  // const { gameState } = useGameContext();

  async function particlesInit(particleEngine: Engine) {
    await loadFull(particleEngine);
  }

  const options = {
    delay: 500,
    duration: 4000,
    particles: {
      color: {
        value: '#2349fe'
      }
    },
    preset: 'confetti'
  };

  return (
    <>
      <Particles
        init={particlesInit}
        options={{
          // background: {
          //   color: {
          //     value: '#000000'
          //   }
          // },
          fullScreen: {
            enable: true,
            zIndex: 400
          },
          interactivity: {
            detectsOn: 'window'
          },
          emitters: {
            position: {
              x: 50,
              y: 20
            },
            rate: {
              quantity: 10,
              delay: 0.25
            }
          },
          // duration: { min: 20, max: 40 },
          particles: {
            color: {
              value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E']
            },
            move: {
              decay: 0.05,
              direction: 'top',
              enable: true,
              gravity: {
                enable: true,
                maxSpeed: 150
              },
              outModes: {
                top: 'none',
                default: 'destroy'
              },
              speed: { min: 25, max: 50 }
            },
            number: {
              value: 0
            },
            opacity: {
              value: 1
            },
            rotate: {
              value: {
                min: 0,
                max: 360
              },
              direction: 'random',
              animation: {
                enable: true,
                speed: 30
              }
            },
            tilt: {
              direction: 'random',
              enable: true,
              value: {
                min: 0,
                max: 360
              },
              animation: {
                enable: true,
                speed: 30
              }
            },
            size: {
              value: 8
            },
            roll: {
              darken: {
                enable: true,
                value: 25
              },
              enable: true,
              speed: {
                min: 5,
                max: 15
              }
            },
            wobble: {
              distance: 30,
              enable: true,
              speed: {
                min: -7,
                max: 7
              }
            },
            shape: {
              type: [
                'circle',
                'character',
                'square',
                'star',
                'character',
                'polygon',
                'character'
                // 'character',
                // 'character',
                // 'image',
                // 'image',
                // 'image'
              ],
              options: {
                // image: [
                //   {
                //     src: 'https://particles.js.org/images/fruits/apple.png',
                //     width: 32,
                //     height: 32,
                //     particles: {
                //       size: {
                //         value: 16
                //       }
                //     }
                //   }

                // ],
                polygon: [
                  {
                    sides: 5
                  },
                  {
                    sides: 6
                  }
                ],
                character: [
                  {
                    fill: true,
                    font: 'Sans-serif',
                    value: [winner.avatar],
                    style: '',
                    weight: 600,
                    particles: {
                      size: {
                        value: 16
                      }
                    }
                  }
                ]
              }
            }
          }
        }}
      />
      <div className="flex flex-col items-center justify-center">
        <h2 className="my-16 mx-8 text-3xl font-bold tracking-wider sm:text-5xl">
          {playerIsWinner ? `CONGRATULATIONS!` : `GOOD TRY!`}
        </h2>
        <p className="text-xl font-bold tracking-wider sm:text-2xl">
          {playerIsWinner ? `YOU WON!` : `${winner.displayName} WINS!`}
        </p>
        <Avatar avatar={winner.avatar} className={`${AvatarSize.XL} relative z-[500]`} />
      </div>
      <div className="my-16 flex justify-around">
        <Button buttonSize="lg" buttonColor="secondary" handler={quitHandler}>
          Quit Game
        </Button>
        <Button buttonSize="lg" buttonColor="secondary" handler={playHandler}>
          Play Again
        </Button>
      </div>
    </>
  );
};

export default GameWinner;

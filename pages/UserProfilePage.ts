import Page from "@classes/Page";
import NavBar from "@classes/components/NavBar";
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import Achievement from "@components/Achievement";
import ImgElement from "@elements/ImgElement";
import Footer from "@components/Footer";

type AchievementObj = {
    id: string;
    title: string;
    description: string;
    icon: string;
    progress?: number;
    goal?: number;
}

type UserGlobalStats = {
    totalGamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    winRate: number; // Relative to total games won and lost
}

type UserProfileData = {
    userName: string;
    userEmail: string;
    userAvatar: string; // URL to the avatar image
}

type MatchHistory = {
    score: number;
    gameType: string;
    date: number;
    gameDuration: number;

    battedBalls: number;

    opponentId: number;
    opponentScore: number;
    opponentBattedBalls: number;


    precision: number; // Relative to batted balls / opponent batted balls

}

class UserProfilePage extends Page {

    public constructor() {
        super("UserProfilePage", new NavBar({}));

        const mainWrapper = new DivElement({
            id: "main-wrapper",
            className: "max-w-7xl mx-auto rounded-[20px] bg-white/2 border border-white/10 p-8 mb-6 md:mb-18"
        });

        const gridContainer = new DivElement({
            id: "flex-container",
            className: "flex flex-col lg:flex-row items-center justify-center gap-8"
        });

        this.buildPage(gridContainer);
        mainWrapper.addComponent(gridContainer);
        this.addComponent(mainWrapper);

        const historyBoard = new DivElement({
            id: "history-board",
            className: "max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-12 min-h-[500px] md:h-[650px]"
        })

        this.buildMatchHistoryBoard(historyBoard);
        this.addComponent(historyBoard);

        this.addComponent(new Footer().build());
        super.render();
    }

    private buildPage(gridContainer: DivElement) {
        //  document.documentElement.addEventListener("page-rendered:UserProfilePage", () => {
        console.error("Page rendered");
        gridContainer.addComponent(this.buildProfileSection({
            userAvatar: "https://tylerchancellor.wordpress.com/wp-content/uploads/2017/09/cover-image1.jpg?w=1568",
            userName: "JohnDoe",
            userEmail: "johndoe@gmail.com"
        }));
        gridContainer.addComponent(this.buildStatisticsSection({
            gamesLost: 10,
            gamesWon: 20,
            totalGamesPlayed: 30,
            winRate: 66.7
        }));
        gridContainer.addComponent(this.buildAchievementsSection([{
            title: "First Victory",
            description: "Achieved your first victory in the game.",
            icon: "https://png.pngtree.com/png-vector/20221003/ourmid/pngtree-cartoon-ping-pong-racket-clip-art-png-image_6264580.png",
            id: "achievement-1",
            progress: 1,
            goal: 1
        },
            {
                title: "Master  Strategist",
                description: "Won 100 games in total.",
                icon: "https://png.pngtree.com/png-vector/20221003/ourmid/pngtree-cartoon-ping-pong-racket-clip-art-png-image_6264580.png",
                id: "achievement-2",
                progress: 50,
                goal: 100
            },
            {
                title: "Master  Strategist",
                description: "Won 100 games in total.",
                icon: "https://png.pngtree.com/png-vector/20221003/ourmid/pngtree-cartoon-ping-pong-racket-clip-art-png-image_6264580.png",
                id: "achievement-3",
                progress: 50,
                goal: 100
            },
            {
                title: "Master  Strategist",
                description: "Won 100 games in total.",
                icon: "https://png.pngtree.com/png-vector/20221003/ourmid/pngtree-cartoon-ping-pong-racket-clip-art-png-image_6264580.png",
                id: "achievement-4",
                progress: 50,
                goal: 100
            },
            {
                title: "Master  Strategist",
                description: "Won 100 games in total.",
                icon: "https://png.pngtree.com/png-vector/20221003/ourmid/pngtree-cartoon-ping-pong-racket-clip-art-png-image_6264580.png",
                id: "achievement-5",
                progress: 50,
                goal: 100
            }]))
        //  });
    }


    private buildProfileSection(userData: UserProfileData): DivElement {
        const profileSection = new DivElement({
            id: "profile-section",
            className: "flex flex-col items-center lg:items-start select-none h-[65%]",
        });

        const avatarContainer = new DivElement({
            id: "avatar-container",
            className: "w-20 h-20 sm:w-34 sm:h-34 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full shadow-[0px_0px_20px_0px_rgba(123,109,255,0.60)] outline-1 outline-[#b794db] bg-transparent mb-4 flex items-center justify-center"
        });
        const avatar = new ImgElement({
            id: "avatar",
            className: "object-cover  w-full h-full rounded-full",
            src: userData.userAvatar
        });
        avatarContainer.addComponent(avatar);
        profileSection.addComponent(avatarContainer);

        const playerName = new TextElement({
            id: "player-name",
            className: "text-[#f1f1f1] text-2xl md:text-3xl font-semibold truncate",
            type: "h1",
            text: userData.userName
        });

        const playerEmail = new TextElement({
            id: "player-email",
            className: "text-[#b4b1bf] text-sm md:text-base truncate",
            type: "p",
            text: userData.userEmail
        });

        const editButton = new ImgElement({
            id: "edit-button",
            className: "w-6 h-6 md:w-7 md:h-7 cursor-pointer",
            src: "/assets/svg/profile_editor.svg"
        });


        profileSection.addComponents([playerName, playerEmail, editButton]);
        return profileSection;
    }

    private buildStatisticsSection(userStats: UserGlobalStats): DivElement {
        const statsData = [
            {
                id: "total-games",
                number: userStats.totalGamesPlayed,
                label: "Parties",
                titleColor: "white/80",
                statColor: "white/80"
            },
            {
                id: "win-rate",
                number: `${userStats.winRate.toFixed(1)}%`,
                label: "Taux de Victoire",
                titleColor: "white/80",
                statColor: "white/80"
            },
            {
                id: "wins-stats",
                number: userStats.gamesWon,
                label: "Victoires",
                titleColor: "white/80",
                statColor: "lime-600",
            },
            {
                id: "losses-stats",
                number: userStats.gamesLost,
                label: "Défaites",
                titleColor: "white/80",
                statColor: "red-400"
            }
        ];

        const statisticsSection = new DivElement({
            id: "statistics-section",
            className: "w-[90%] md:w-[70%] lg:w-[50%] bg-white/5 rounded-2xl mx-auto p-6 select-none",
            style: "height: calc(4 * 80px + 2 * 16px);",
            children: [new TextElement({
                id: "statistics-title",
                className: "text-[#bebfff] text-xl md:text-2xl font-semibold mb-6 truncate",
                type: "h2",
                text: "Statistiques"
            })]
        });

        const statisticsGrid = new DivElement({
            id: "statistics-grid",
            className: "w-full grid grid-cols-1 sm:grid-cols-2 gap-6 text-center truncate",
        });

        for (const stats of statsData) {
            console.log("text-" + stats.statColor)
            const statsDiv = new DivElement({
                id: stats.id,
                className: "space-y-2",
                children: [
                    new TextElement({
                        id: `${stats.id}-number`,
                        className: `text-${stats.statColor} text-2xl md:text-3xl font-bold font-poppins`,
                        type: "p",
                        text: stats.number.toString(),
                    }),
                    new TextElement({
                        id: `${stats.id}-label`,
                        className: "text-" + stats.titleColor + " text-sm md:text-base font-inter",
                        type: "p",
                        text: stats.label
                    })
                ]
            });
            statisticsGrid.addComponent(statsDiv);
        }

        statisticsSection.addComponent(statisticsGrid);

        return statisticsSection;
    }

    private buildAchievementsSection(achievements: AchievementObj[]): DivElement {
        const achievementsSection = new DivElement({
            id: "achievements-section",
            className: "w-[90%] md:w-[80%] lg:w-[70%] bg-white/5 rounded-2xl p-6 select-none flex flex-col",
            style: "max-height: calc(4 * 80px + 2 * 16px);",
            children: [new TextElement({
                id: "achievements-title",
                className: "text-[#bebfff] text-xl md:text-2xl font-semibold mb-6 flex-shrink-0 truncate",
                type: "h2",
                text: "Succès"
            })]
        });

        // Container avec hauteur fixe pour exactement 3 achievements
        const achievementsList = new DivElement({
            id: "achievements-list",
            className: "flex flex-col gap-4 overflow-y-auto  scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-white/6 scrollbar-track-transparent pr-3",
            style: "max-height: calc(3 * 80px + 2 * 16px);"
        });

        for (const achievement of achievements) {
            achievementsList.addComponent(new Achievement({
                id: achievement.id,
                achievementTitle: achievement.title,
                achievementDescription: achievement.description,
                achievementIcon: achievement.icon,
                achievementProgress: achievement.progress
            }));
        }

        achievementsSection.addComponent(achievementsList);
        return achievementsSection;
    }

    private buildMatchHistoryBoard(historyBoard: DivElement) {

        const boardTitle = new TextElement({
            id: "board-title",
            className: "text-lavender text-xl md:text-2xl font-semibold mb-8 md:mb-12",
            text: "Match History"
        });

        historyBoard.addComponent(boardTitle);

        const contentContainer = new DivElement({
            id: "content-container",
            className: "flex flex-col items-center justify-center gap-4 md:gap-6 h-fit overflow-y-auto  scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-white/6 scrollbar-track-transparent pr-3",
            style: "max-height: calc(5 * 80px + 2 * 16px);"
        })

        const matchHistory: MatchHistory[] = [
            {
                score: 21,
                gameType: "ranked",
                date: 1717036800000, // 30 May 2024
                gameDuration: 320,
                battedBalls: 35,
                opponentId: 1023,
                opponentScore: 18,
                opponentBattedBalls: 28,
                precision: 1.25,
            },
            {
                score: 18,
                gameType: "casual",
                date: 1716950400000,
                gameDuration: 280,
                battedBalls: 30,
                opponentId: 1044,
                opponentScore: 21,
                opponentBattedBalls: 33,
                precision: 0.91,
            },
            {
                score: 25,
                gameType: "ranked",
                date: 1716864000000,
                gameDuration: 350,
                battedBalls: 40,
                opponentId: 1087,
                opponentScore: 20,
                opponentBattedBalls: 32,
                precision: 1.25,
            },
            {
                score: 17,
                gameType: "arcade",
                date: 1716777600000,
                gameDuration: 290,
                battedBalls: 28,
                opponentId: 1102,
                opponentScore: 19,
                opponentBattedBalls: 31,
                precision: 0.90,
            },
            {
                score: 22,
                gameType: "ranked",
                date: 1716691200000,
                gameDuration: 330,
                battedBalls: 36,
                opponentId: 1150,
                opponentScore: 15,
                opponentBattedBalls: 25,
                precision: 1.44,
            },
            {
                score: 19,
                gameType: "casual",
                date: 1716604800000,
                gameDuration: 310,
                battedBalls: 32,
                opponentId: 1195,
                opponentScore: 19,
                opponentBattedBalls: 32,
                precision: 1.0,
            },
            {
                score: 14,
                gameType: "arcade",
                date: 1716518400000,
                gameDuration: 270,
                battedBalls: 26,
                opponentId: 1230,
                opponentScore: 18,
                opponentBattedBalls: 29,
                precision: 0.90,
            },
            {
                score: 23,
                gameType: "ranked",
                date: 1716432000000,
                gameDuration: 300,
                battedBalls: 38,
                opponentId: 1266,
                opponentScore: 20,
                opponentBattedBalls: 30,
                precision: 1.27,
            },
            {
                score: 20,
                gameType: "casual",
                date: 1716345600000,
                gameDuration: 315,
                battedBalls: 34,
                opponentId: 1300,
                opponentScore: 22,
                opponentBattedBalls: 36,
                precision: 0.94,
            },
            {
                score: 16,
                gameType: "arcade",
                date: 1716259200000,
                gameDuration: 280,
                battedBalls: 29,
                opponentId: 1325,
                opponentScore: 15,
                opponentBattedBalls: 27,
                precision: 1.07,
            },
            {
                score: 24,
                gameType: "ranked",
                date: 1716172800000,
                gameDuration: 340,
                battedBalls: 39,
                opponentId: 1370,
                opponentScore: 20,
                opponentBattedBalls: 33,
                precision: 1.18,
            },
            {
                score: 15,
                gameType: "casual",
                date: 1716086400000,
                gameDuration: 275,
                battedBalls: 27,
                opponentId: 1405,
                opponentScore: 17,
                opponentBattedBalls: 31,
                precision: 0.87,
            },
            {
                score: 26,
                gameType: "ranked",
                date: 1716000000000,
                gameDuration: 360,
                battedBalls: 42,
                opponentId: 1452,
                opponentScore: 19,
                opponentBattedBalls: 30,
                precision: 1.4,
            },
            {
                score: 13,
                gameType: "arcade",
                date: 1715913600000,
                gameDuration: 250,
                battedBalls: 25,
                opponentId: 1489,
                opponentScore: 20,
                opponentBattedBalls: 34,
                precision: 0.74,
            },
            {
                score: 21,
                gameType: "casual",
                date: 1715827200000,
                gameDuration: 300,
                battedBalls: 33,
                opponentId: 1520,
                opponentScore: 21,
                opponentBattedBalls: 33,
                precision: 1.0,
            },
        ];

        for (let data of matchHistory) {
            this.buildMatchHistory(data, contentContainer);
        }

        historyBoard.addComponent(contentContainer);
    }


    private buildMatchHistory(historyData: MatchHistory, historyBoard: DivElement) {
        const matchContainer = new DivElement({
            id: "match-" + historyData.date,
            className: "w-[80%] md:w-full h-fit md:h-20 bg-white/5 rounded-lg border border-white/10"
        })


        const matchFlex = new DivElement({className: "flex flex-col md:flex-row items-center h-full"})

        //THIS
        const leftPart = new DivElement({className: "d:pl-8 h-full w-fit flex items-center gap-x-5"})
        const matchIcon = new DivElement({className: "hidden md:inline w-11 h-11 md:w-13 md:h-13 bg-[#dddddd] rounded-lg"})

        const gameInfos = new DivElement({
            className: "flex flex-col items-center md:items-start", children: [
                new TextElement({
                    className: "text-[#cd3636] text-lg md:text-xl font-semibold font-poppins",
                    type: "p",
                    text: historyData.score > historyData.opponentScore ? "Victory" : "Lose"
                }),
                //TODO: PARSE THE TIMESTAMP ON THE GOOD FORMAT
                new TextElement({
                    className: "text-[#b4b1bf] text-sm font-poppins",
                    type: "p",
                    text: "TM: " + historyData.date
                }),
                new TextElement({
                    className: "text-[#b4b1bf] text-sm font-poppins",
                    type: "p",
                    text: historyData.gameType
                })
            ]
        })

        const divider = new DivElement({className: "hidden md:inline w-0 h-14 outline-2 outline-[#441db6] opacity-50"});

        leftPart.addComponents([matchIcon, gameInfos, divider]);

        const rightPart = new DivElement({className: "flex flex-col items-center justify-center w-fit md:w-120 gap-y-3 md:gap-y-0"});
        const playersContainer = new DivElement({
            className: "flex flex-col sm:flex-row items-center gap-1 md:gap-3 text-center justify-center",
            children: [
                new TextElement({
                    className: "text-[#cd3636] text-base md:text-lg font-semibold",
                    type: "p",
                    text: "FETCH USERNAME"
                }),
                new TextElement({className: "text-white/60 text-sm md:text-base font-semibold", type: "p", text: "vs"}),
                new TextElement({
                    className: "text-[#37bc68] text-base md:text-lg font-semibold",
                    type: "p",
                    text: "FETCH USERNAME 2"
                })
            ]
        });

        const scoresContainer = new DivElement({
            className: "flex items-center gap-1.5", children: [
                new TextElement({
                    className: "text-[#cd3636] text-xs font-semibold",
                    type: "p",
                    text: historyData.score.toString()
                }),
                new TextElement({
                    className: "text-white/60 text-xs font-semibold",
                    type: "p",
                    text: "-"
                }),
                new TextElement({
                    className: "text-[#37bc68] text-xs font-semibold",
                    type: "p",
                    text: historyData.opponentScore.toString()
                })
            ]
        });

        const gameStatsContainer = new DivElement({
            className: "flex flex-col sm:flex-row gap-2 md:gap-8 text-center", children: [
                new TextElement({
                    className: "text-white text-xs font-semibold",
                    type: "p",
                    text: "Game Duration: " + historyData.gameDuration.toString()
                }),
                new TextElement({
                    className: "text-white text-xs font-semibold",
                    type: "p",
                    text: "Batted Balls: " + historyData.battedBalls.toString() + ':' + historyData.opponentBattedBalls.toString()
                }),
                new TextElement({
                    className: "text-white text-xs font-semibold",
                    type: "p",
                    text: "Precision: " + historyData.precision.toPrecision(2)
                })
            ]
        });

        rightPart.addComponents([playersContainer, scoresContainer, gameStatsContainer]);
        matchFlex.addComponents([leftPart, rightPart]);
        matchContainer.addComponent(matchFlex);
        historyBoard.addComponent(matchContainer);
    }


}


export default UserProfilePage;

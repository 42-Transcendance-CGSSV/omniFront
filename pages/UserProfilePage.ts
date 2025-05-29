import Page from "@classes/Page";
import NavBar from "@classes/components/NavBar";
import Footer from "@classes/components/Footer";
import PlayerDisplayer from "@classes/components/PlayerDisplayer";
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import ProgressBar from "@components/ProgressBar";

interface UserProfilePageProps {
    id?: string;
}

class UserProfilePage extends Page {
    private userId: string;

    constructor(props?: UserProfilePageProps) {
        super("UserProfilePage", new NavBar({}));
        this.userId = props?.id ?? "1";
        this.init();
    }

    private async init() {
        await this.setup();
        super.render();
    }

    private async setup() {
        // MOCK: données factices pour le profil utilisateur
        const user = {
            avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=PlayerOne",
            name: "PlayerOne",
            email: "player@example.com"
        };
        const stats = {
            games: 142,
            winRate: 62.7,
            wins: 89,
            losses: 53
        };
        const achievements = [
            {title: "First Victory", description: "Win your first game", progress: 0, goal: 1},
            {title: "Win Streak", description: "Win 5 games in a row", progress: 3, goal: 5},
            {title: "Champion", description: "Reach top of leaderboard", progress: 15, goal: 25}
        ];
        const matches = [
            {
                result: "Loose",
                date: "1 Month Ago",
                type: "UnRanked Game",
                player1: "jbadaire",
                player2: "guillrodr",
                score1: 5,
                score2: 11,
                duration: "10:25",
                precision: "80%"
            },
            {
                result: "Win",
                date: "1 Month Ago",
                type: "UnRanked Game",
                player1: "jbadaire",
                player2: "guillrodr",
                score1: 11,
                score2: 5,
                duration: "10:25",
                precision: "80%"
            }
            // ...ajoute d'autres matchs si besoin
        ];

        // Profil utilisateur (avatar, nom, email)
        const profileSection = new DivElement({
            className: "flex flex-col md:flex-row items-center gap-8 bg-white/5 rounded-3xl p-8 mb-8 w-full max-w-4xl mx-auto",
            children: [
                new PlayerDisplayer(user.avatarUrl).build(),
                new DivElement({
                    className: "flex flex-col gap-2 items-start",
                    children: [
                        new TextElement({
                            text: user.name,
                            className: "text-3xl font-bold text-white flex items-center gap-2"
                        }),
                        new TextElement({
                            text: user.email,
                            className: "text-lg text-white/70"
                        })
                    ]
                })
            ]
        });

        // Statistiques
        const statsSection = new DivElement({
            className: "flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto mb-8",
            children: [
                new DivElement({
                    className: "flex-1 bg-white/5 rounded-2xl p-6 flex flex-col gap-2",
                    children: [
                        new TextElement({
                            text: "Statistics",
                            className: "text-xl font-semibold text-blue-lavender mb-2"
                        }),
                        new TextElement({
                            text: `${stats.games} Games`,
                            className: "text-3xl font-bold text-white"
                        }),
                        new TextElement({
                            text: `${stats.winRate}% Win Rate`,
                            className: "text-xl text-white/80"
                        }),
                        new TextElement({
                            text: `${stats.wins} Wins`,
                            className: "text-lg text-emerald-400"
                        }),
                        new TextElement({
                            text: `${stats.losses} Losses`,
                            className: "text-lg text-red-400"
                        })
                    ]
                }),
                new DivElement({
                    className: "flex-1 bg-white/5 rounded-2xl p-6 flex flex-col gap-2",
                    children: [
                        new TextElement({
                            text: "Achievements",
                            className: "text-xl font-semibold text-blue-lavender mb-2"
                        }),
                        ...achievements.map((ach: any) => new DivElement({
                            className: "bg-white/10 rounded-xl p-3 mb-2 flex flex-col gap-1",
                            children: [
                                new TextElement({
                                    text: ach.title,
                                    className: "text-white font-bold"
                                }),
                                new TextElement({
                                    text: ach.description,
                                    className: "text-white/70 text-sm"
                                }),
                                new ProgressBar({
                                    height: "20px",
                                    width: "100%",
                                    backgroundColor: "bg-red-300",
                                    progressColor: "bg-green-500",
                                    showText: true,
                                    currentValue: ach.progress,
                                    maxValue: ach.goal,
                                    textContent: "{{current}}%"
                                })
                            ]
                        }))
                    ]
                })
            ]
        });

        // Historique des matchs
        const matchHistorySection = new DivElement({
            className: "w-full max-w-5xl mx-auto bg-white/5 rounded-3xl p-8 mb-8",
            children: [
                new TextElement({
                    text: "Match History",
                    className: "text-2xl font-bold text-blue-lavender mb-4"
                }),
                ...matches.map((match: any) => {
                    // Détermination du gagnant et du perdant
                    const player1IsWinner = match.score1 > match.score2;
                    const winnerName = player1IsWinner ? match.player1 : match.player2;
                    const winnerScore = player1IsWinner ? match.score1 : match.score2;
                    const loserName = player1IsWinner ? match.player2 : match.player1;
                    const loserScore = player1IsWinner ? match.score2 : match.score1;

                    return new DivElement({
                        className: `flex flex-col md:flex-row items-center justify-between bg-white/10 rounded-xl p-4 mb-3 border-l-4 ${player1IsWinner ? (match.player1 === user.name ? 'border-emerald-400' : 'border-red-400') : (match.player2 === user.name ? 'border-emerald-400' : 'border-red-400')}`,
                        children: [
                            new TextElement({
                                text: `${winnerName} (W)`,
                                className: "text-lg font-bold text-emerald-400"
                            }),
                            new TextElement({
                                text: `${winnerScore}`,
                                className: "text-lg font-bold text-emerald-400"
                            }),
                            new TextElement({
                                text: "vs",
                                className: "text-white/60 text-base"
                            }),
                            new TextElement({
                                text: `${loserName} (L)`,
                                className: "text-lg font-bold text-red-400"
                            }),
                            new TextElement({
                                text: `${loserScore}`,
                                className: "text-lg font-bold text-red-400"
                            }),
                            new TextElement({
                                text: `${match.date} - ${match.type}`,
                                className: "text-white/70 text-sm"
                            }),
                            new TextElement({
                                text: `Duration: ${match.duration} | Precision: ${match.precision}`,
                                className: "text-white/60 text-xs"
                            })
                        ]
                    });
                })
            ]
        });

        // Ajout des sections à la page
        this.addComponent(profileSection);
        this.addComponent(statsSection);
        this.addComponent(matchHistorySection);
        this.addComponent(new Footer().build());

    }

    private setTo(to: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, to));

    }

}


export default UserProfilePage;

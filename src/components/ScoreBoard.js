import React, { Component } from 'react'

export class ScoreBoard extends Component {
    render() {
        let round5 = JSON.parse(localStorage.getItem(`High_Score_5`))
        let round10 = JSON.parse(localStorage.getItem(`High_Score_10`))
        return (
            <div className="ui segment">
                <div className="ui header center aligned">
                    <h1 class="ui red header">Scoreboard</h1>
                </div>
                <div className="ui divider"></div>
                {round10 == null || round5 == null ? <h2 class="ui header center aligned">No high-scores saved. Play a game to receive a high-score!</h2> :
                    <div id="Scoreboard">
                        <div style={{ textAlign: 'left' }}>
                            <div id="scoreboard-title">
                                <table class="ui celled inverted selectable table">
                                    <thead className="">
                                        <tr className="">
                                            <th className="">Rounds<i id="scoreboard-icon" aria-hidden="true" className="hourglass half icon" ></i></th>
                                            <th className="">Score<i id="scoreboard-icon" aria-hidden="true" className="trophy yellow icon" ></i></th>
                                            <th className="">Date<i id="scoreboard-icon" aria-hidden="true" className="calendar alternate outline icon" ></i></th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        <tr className="">
                                            <td className="">5</td>
                                            <td className="">{round5.High_Score}</td>
                                            <td className="">{round5.Date}</td>
                                        </tr>
                                        <tr className="">
                                            <td className="">10</td>
                                            <td className="">{round10.High_Score}</td>
                                            <td className="">{round10.Date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ScoreBoard

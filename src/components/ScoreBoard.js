import React, { Component } from 'react'

export class ScoreBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            round5: JSON.parse(localStorage.getItem(`High_Score_5`)),
            round10: JSON.parse(localStorage.getItem(`High_Score_10`)),
            roundSpeed: JSON.parse(localStorage.getItem(`High_Score_Speed`))
        }
    }
    render() {
        let array = [this.state.round5, this.state.round10, this.state.roundSpeed]
        return (
            <div className="ui segment">
                <div className="ui header center aligned">
                    <h1 className="ui header">Scoreboard</h1>
                </div>
                <div className="ui divider"></div>
                {array == '' ? <h2 class="ui header center aligned">No high-scores saved. Play a game to receive a high-score!</h2> :
                    <div id="Scoreboard">
                        <div style={{ textAlign: 'left' }}>
                            <div id="scoreboard-title">
                                <table className="ui celled inverted selectable table">
                                    <thead className="">
                                        <tr className="">
                                            <th className="">Rounds<i id="scoreboard-icon" aria-hidden="true" className="hourglass half icon" ></i></th>
                                            <th className="">Score<i id="scoreboard-icon" aria-hidden="true" className="trophy yellow icon" ></i></th>
                                            <th className="">Date<i id="scoreboard-icon" aria-hidden="true" className="calendar alternate outline icon" ></i></th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {Object.values(array).map((val, i) => (
                                            val == null ? '' :
                                                <tr key={i}>
                                                    <td>{val.Rounds}</td>
                                                    <td>{val.High_Score}</td>
                                                    <td>{val.Date}</td>
                                                </tr>
                                        ))}
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

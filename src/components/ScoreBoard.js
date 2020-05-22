import React, { Component } from 'react'

export class ScoreBoard extends Component {
    render() {
        let round5 = JSON.parse(localStorage.getItem(`High_Score_5`))
        let round10 = JSON.parse(localStorage.getItem(`High_Score_10`))
        return (
            <div className="ui segment">
                <div className="ui header left aligned">Scoreboard</div>
                <div className="ui divider"></div>
                {round10 == null || round5 == null ? '' :
                    <div id="Scoreboard" style={{ textAlign: 'left' }}>
                        <p>5 Rounds: {round5.High_Score} | {round5.Date}</p>
                        <p>10 Rounds: {round10.High_Score} | {round10.Date}</p>
                    </div>}
            </div>
        )
    }
}

export default ScoreBoard

import React from "react";
import { connect } from "react-redux";

class Message extends React.Component {
    render (){
        let message;
        if (this.props.check){
            const winner = this.props.turn === "b" ? "black" : "white"
            message = `Check Mate! ${winner} wins!`;
        } 
        else if (this.props.turn === 'w') message = "It's your turn, white!";
        else if (this.props.turn === 'b') message = "It's your turn, black!";
        else message = null;

        return (
            (<div className="messageContainer">
                <p className="message">{message}</p>
            </div>)
        )
    }
}

const mapStateToProps = state => ({
    turn: state.turn,
    check: state.check,
    promote: state.promotion.popUp
})

const connectedMessage = connect(mapStateToProps)(Message)

export default connectedMessage;
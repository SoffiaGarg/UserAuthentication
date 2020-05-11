import React, { Component } from "react";
import '../../assets/styles.css';

/**
 * When the popup first time appear , its display property will be block and on click on close
 * set its display property to "none".
 */
class Popup extends Component {
    state={
        display:"block"
    }
    hidePopup = () => {
      this.setState({
          display:"none"
      });
      this.props.onClosePopup();
    }

    render() {
        return (
            <div id="popupdiv" style={{ display: this.state.display}}>
                <div id="popupMessage">
                    <button id="close" type="button" aria-label="Close" onClick={this.hidePopup}>
                        <span aria-hidden="true">×</span>
                    </button><p>{this.props.message}</p>
                </div>
                </div>
        )
    }
}

export default Popup;
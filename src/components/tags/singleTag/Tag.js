import React, {Component} from "react";

export default class Tag extends Component {

    state = {
        name: this.props.tag.name
    };

    changeName = (event) => {
        this.setState({name: event.target.value});

        setTimeout(() => {
            this.props.changeTag(this.props.tag.id, this.state.name);
        }, 1000)
    };

    deleteTag = () => this.props.deleteTag(this.props.tag.id);

    render() {
        return (
            <div className="input-group mb-1 single-tag">
                <input className="form-control mr-1" value={this.state.name} name="name" onChange={this.changeName}/>
                <button className="btn" type="button" onClick={ this.deleteTag}>Delete</button>
            </div>
        )
    }
}
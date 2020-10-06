import React, {Component} from "react";
import "../note.css"
import api from "../../../apis/api";
import ManageTags from "./manageTags/ManageTags";
import {Link} from "react-router-dom";

export default class CreateUpdate extends Component {

    state = {
        title: "",
        content: "",
        tagsId: [],
        msg: "",
        tags: []
    };

    componentDidMount() {
        if (this.props.history.location.pathname !== '/create-note') {
            api.notes().getOne(this.props.match.params.id).then(response => {
                this.setState({
                    tags: response.data.tags,
                    title: response.data.title,
                    content: response.data.content
                });
            });
        }
    }

    onChangeData = (event) => this.setState({[event.target.name]: event.target.value});

    saveNote = (event) => {
        event.preventDefault();

        let data = {
            title: this.state.title,
            content: this.state.content,
            tagsId: this.state.tagsId
        };

        if (this.props.history.location.pathname !== '/create-note') {
            api.notes().update(data, this.props.match.params.id).then(response => response.status === 200
                ? this.setState({msg: "Note has been updated"})
                : this.setState({msg: "Something went wrong while updating note"})
            )
        } else {
            api.notes().create(data).then(response => response.status === 200
                ? this.setState({msg: "Note has been added"})
                : this.setState({msg: "Something went wrong while creating note"})
            );
        }
    };

    updateTagsId = (id) => {
        if (!this.state.tagsId.includes(id))
            this.setState({tagsId: id});
    };

    render() {
        return (
            <div className="container create-update-component">

                <h1>Note</h1>
                <h3>{this.state.msg}</h3>
                <form onSubmit={this.saveNote}>
                    <input className="form-control mb-4" name="title" placeholder="Add Title"
                           value={this.state.title}
                           onChange={this.onChangeData}/>

                    <textarea className="form-control mb-4" name="content" placeholder="Add Content"
                              value={this.state.content} rows="6" onChange={this.onChangeData}/>

                    <ManageTags updateTagsId={this.updateTagsId} tags={this.state.tags}/>

                    <div>
                        <button className="buttons form-control mr-3"
                                disabled={this.state.content === "" || this.state.title === ""}>Save
                        </button>
                        <Link to={`/`}><input className=" buttons form-control" value="Cancel" type="button"/></Link>
                    </div>
                </form>
            </div>
        )
    }
}

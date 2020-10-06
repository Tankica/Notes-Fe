import React, {Component} from "react";
import Note from "./singleNote/Note";
import api from "../../apis/api";

export default class Notes extends Component {

    state = {
        notes: {},
        filter:false
    };

    removeForm = id => {
        api.notes().delete(id).then(() => this.getAllNotes())
    };

    componentDidMount() {
        this.getAllNotes();
    }

    getAllNotes =() =>{
        api.notes().getAll().then(response => this.setState({notes: response.data}));
        this.setState({filter:false})
    };

    filterTags = (id) =>{
        api.notes().getByTagId(id).then(response => this.setState({notes: response.data}));
        this.setState({filter:true});
    };
    render() {
        return (
            <div className="container">
                {this.state.filter
                    ? <input type="button" className="btn btn-info form-control border-dark" onClick={this.getAllNotes} value="Cancel Filter"/>
                    : null}
                <div className="row">
                    {Object.values(this.state.notes).map(note =>
                        <Note key={note.id} post={note} removeForm={this.removeForm} filterTags={this.filterTags}/>
                    )}
                </div>
            </div>
        )
    }

}
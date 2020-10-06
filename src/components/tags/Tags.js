import React, {Component} from "react";
import "./tags.css"
import api from '../../apis/api'
import Tag from "./singleTag/Tag";

export default class Tags extends Component {

    state = {
        tags: [],
        name: "",
    };

    componentDidMount() {
        this.getTags();
    }

    onChange = (event) => {
        this.setState({name: event.target.value});
    };

    createTag = () => {
        api.tags().create({name: this.state.name}).then(this.getTags)
    };

    getTags = () => {
        api.tags().getAll().then((request) => this.setState({tags: request.data}));
    };

    changeTag = (id, tagName) => {
        api.tags().update({name: tagName}, id).then(this.getTags)
    };

    deleteTag = (id) => {
        api.tags().delete(id).then(this.getTags);
    };


    render() {
        return (
            <div className="tags-component container rounded">
                <h1>Tags</h1>
                <hr/>
                <div className="row">
                    <div className="col-8">
                        <div className="input-group mb-4">
                            <input className="form-control mr-1" placeholder="Create new Tag" name="name" onChange={this.onChange}/>
                            <span className="input-group-btn">
                            <button className="btn" onClick={this.createTag} disabled={this.state.name.length === 0}>Create</button>
                        </span>
                        </div>
                        {Object.values(this.state.tags).map(tag =>
                            <Tag tag={tag} key={tag.id} deleteTag={this.deleteTag} changeTag={this.changeTag}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
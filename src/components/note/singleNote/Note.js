import React, {Component} from "react";
import '../note.css'
import {Link} from "react-router-dom";

export default class Note extends Component {

    handleRemove = () => this.props.removeForm(this.props.post.id);

    filterTags = (id) => this.props.filterTags(id);

    render() {
        return (
            <div className="col-3 single-note">
                <div className="card m-2 box border-dark">
                    <div className="card-header">
                        <p className="text-center font-weight-bold">{this.props.post.title}
                            <i className="material-icons edit-icon float-right">
                                <a href="/#" onClick={this.handleRemove}>clear</a>
                            </i>
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{this.props.post.content}</p>
                    </div>
                    <div className="card-footer">
                        {Object.values(this.props.post.tags).map(tag =>
                            <h3 className="badge badge-pill float-left mr-2" key={tag.id}>
                                <a href="/#" onClick={() => this.filterTags(tag.id)}> #{tag.name} </a>
                            </h3>
                        )}
                        <Link to={`/edit-note/${this.props.post.id}`}>
                            <i className="material-icons edit-icon float-right">edit</i>
                        </Link>
                    </div>
                </div>
            </div>)
    }
}
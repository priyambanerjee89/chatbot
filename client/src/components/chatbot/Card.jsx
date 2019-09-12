import React from 'react';

const Card = ( props ) => (
    <div style={{ width:270, paddingRight:30, float: 'left' }}>
         <div className="card">
            <div className="card-image" style={{ width: 240 }}>
                <img alt={ props.payload.fields.header.stringValue } src={ props.payload.fields.image.stringValue } />
                <span className="card-title">{ props.payload.fields.header.stringValue }</span>
            </div>
            <div className="card-content">
                <p>{ props.payload.fields.description.stringValue }</p>
            </div>
            <div className="card-action">
                <a target="_blank" rel="noopener" href={ props.payload.fields.link.stringValue }>Read more about author</a>
            </div>
        </div>
    </div>
)

export default Card;
"use client"
import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

const EditorDemo = () => {
    const [text1, setText1] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');
    const [text2, setText2] = useState('');

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }

    const header = renderHeader();

    return (
        <div>
            <div className="card">
                <h5>Default</h5>
                <Editor style={{ height: '320px' }} value={text1} onTextChange={(e) => setText1(e.htmlValue)} />

                <h5>Customized</h5>
                <Editor headerTemplate={header} style={{ height: '320px' }} value={text2} onTextChange={(e) => setText2(e.htmlValue)} />
            </div>
        </div>
    );
}

export default EditorDemo;

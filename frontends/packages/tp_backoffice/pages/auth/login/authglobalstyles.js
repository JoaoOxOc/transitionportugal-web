import css from 'styled-jsx/css'

export default css.global`
:root {
    
    --forny-p1: 0.25rem; /* 4px */
    --forny-p2: 0.5rem; /* 8px */
    --forny-p3: 0.75rem; /* 12px */
    --forny-p4: 1rem; /* 16px */
    --forny-p5: 1.25rem; /* 20px */
    --forny-p6: 1.5rem; /* 24px */
    --forny-p8: 2rem; /* 32px */
    --forny-p10: 2.5rem; /* 40px */
    --forny-text-xs: 0.75rem; /* 12px */
    --forny-text-sm: 0.875rem; /* 12px */
    --forny-text-md: 1rem; /* 16px */
    --forny-form-width: 26rem;
    --forny-color-facebook: hsla(221, 40%, 47%, 1);
    --forny-color-google: hsla(4, 69%, 53%, 1);
    --forny-color-twitter: hsla(195, 100%, 60%, 1);
    --forny-form-control-border: 1px solid red;
    --forny-form-control-padding: 4px;
    --forny-shadow-color: black;
    --forny-shadow: 0 3px 6px var(--forny-shadow-color);

    --forny-red-100: hsla(0, 100%, 94%, 1);
    --forny-red-500: hsla(4, 69%, 53%, 1);

    --forny-danger-100: hsla(0, 100%, 94%, 1);
    --forny-danger-500: hsla(4, 69%, 53%, 1);

    --forny-color-success-100: hsla(152, 68%, 96%, 1);
    --forny-color-text: black;
    --forny-color-header: var(--forny-color-text);

    --forny-color-accent-500: red;
    
    --border-width: 1px;
    --border-radius: .3rem;
    --color-error: #c94b4b;
    --color-info: #157efb;
    --color-info-text: #fff;
    
    --forny-form-paddings: 2.5rem;
    --forny-bg-color: #AD8339;

    --forny-color-accent-500: hsla(208, 100%, 50%, 1);
    --forny-color-accent-700: hsla(211, 91%, 42%, 1);

    --forny-color-gray-300: hsla(0, 0%, 0%, 0.16);
    --forny-color-gray-700: hsla(209, 23%, 60%, 1);
    --forny-color-gray-900: hsla(208, 20%, 24%, 1);

    --forny-font-family: 'Nunito', sans-serif;
    --forny-color-text: var(--forny-color-gray-700);
    --forny-color-header: var(--forny-color-gray-900);
    --forny-link-color: var(--forny-color-accent-700);

    --forny-form-control-border: 1px solid var(--forny-color-gray-700);
    --forny-form-control-padding: var(--forny-p2) var(--forny-p4);
    --forny-form-control-radius: 0;
    --forny-shadow-color: var(--forny-color-gray-300);
}
.__next-auth-theme-auto, .__next-auth-theme-light {
    --color-background: #fff;
    --color-text: #000;
    --color-primary: #444;
    --color-control-border: #bbb;
    --color-button-active-background: #f9f9f9;
    --color-button-active-border: #aaa;
    --color-seperator: #ccc;
}
.__next-auth-theme-dark {
    --color-background: #000;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-seperator: #444;
}
@media (prefers-color-scheme:dark) {
    .__next-auth-theme-auto {
    --color-background: #000;
    --color-text: #fff;
    --color-primary: #ccc;
    --color-control-border: #555;
    --color-button-active-background: #060606;
    --color-button-active-border: #666;
    --color-seperator: #444;
}
}
body {
    background-color: var(--color-background);
    margin: 0;
    padding: 0;
    font-family: -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
h1 {
    font-weight: 400;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
}
h1, p {
    color: var(--color-text);
}
form {
    margin: 0;
    padding: 0;
}
label {
    font-weight: 500;
    text-align: left;
    margin-bottom: .25rem;
    display: block;
    color: #666;
}
input[type] {
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: .5rem 1rem;
    border: var(--border-width) solid var(--color-control-border);
    background: var(--color-background);
    font-size: 1rem;
    border-radius: var(--border-radius);
    box-shadow: inset 0 .1rem .2rem rgba(0, 0, 0, .2);
    color: var(--color-text);
}
input[type]:focus {
    box-shadow: none;
}
p {
    margin: 0 0 1.5rem;
    padding: 0 1rem;
    font-size: 1.1rem;
    line-height: 2rem;
}
a.button {
    text-decoration: none;
    line-height: 1rem;
}
a.button, a.button:link, a.button:visited, button {
    background-color: var(--color-background);
    color: var(--color-primary);
}
a.button, button {
    margin: 0 0 .75rem;
    padding: .75rem 1rem;
    border: var(--border-width) solid var(--color-control-border);
    font-size: 1rem;
    border-radius: var(--border-radius);
    transition: all .1s ease-in-out;
    box-shadow: 0 .15rem .3rem rgba(0, 0, 0, .15), inset 0 .1rem .2rem var(--color-background), inset 0 -.1rem .1rem rgba(0, 0, 0, .05);
    font-weight: 500;
    position: relative;
}
a.button:hover, button:hover {
    cursor: pointer;
}
a.button:active, button:active {
    box-shadow: 0 .15rem .3rem rgba(0, 0, 0, .15), inset 0 .1rem .2rem var(--color-background), inset 0 -.1rem .1rem rgba(0, 0, 0, .1);
    background-color: var(--color-button-active-background);
    border-color: var(--color-button-active-border);
    cursor: pointer;
}
a.site {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 1rem;
    line-height: 2rem;
}
a.site:hover {
    text-decoration: underline;
}
.page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: table;
    margin: 0;
    padding: 0;
}
.page>div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    padding: .5rem;
}
.error a.button {
    display: inline-block;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: .5rem;
}
.error .message {
    margin-bottom: 1.5rem;
}
.signin a.button, .signin button, .signin input[type=text] {
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.signin hr {
    display: block;
    border: 0;
    border-top: 1px solid var(--color-seperator);
    margin: 1.5em auto 0;
    overflow: visible;
}
.signin hr:before {
    content: "or";
    background: var(--color-background);
    color: #888;
    padding: 0 .4rem;
    position: relative;
    top: -.6rem;
}
.signin .error {
    background: #f5f5f5;
    font-weight: 500;
    border-radius: .3rem;
    background: var(--color-info);
}
.signin .error p {
    text-align: left;
    padding: .5rem 1rem;
    font-size: .9rem;
    line-height: 1.2rem;
    color: var(--color-info-text);
}
.signin>div, .signin form {
    display: block;
    margin: 0 auto .5rem;
}
.signin>div input[type], .signin form input[type] {
    margin-bottom: .5rem;
}
.signin>div button, .signin form button {
    width: 100%}
.signin>div, .signin form {
    max-width: calc(var(--forny-form-width) + (var(--forny-form-paddings) * 2));
}
`
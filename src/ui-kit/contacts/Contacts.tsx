import * as React from "react";
import "./Contacts.css";


export function Contacts() {
    const contacts = getContacts();
    return (
        <div className={"contacts"}>
            <div className={"contact-text"}>Contact us anytime! We're ready to help 24/7</div>
            {contacts.map((contact) => <div className={"contact"}>{contact}</div>)}
        </div>
    )
}

function getContacts() {
    return [
        "instagram",
        "mail",
        "phone",
        "support"
    ];
}
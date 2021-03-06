import React, {useState} from "react";
import InputMask from "react-input-mask";
import $ from "jquery";
import axios from "axios";
import {API_URL} from "../constant";
import {shallowEqual, useSelector} from "react-redux";

export const OnClickModal = (props) => {
    const [modalName, setModalName] = useState('');
    const [modalPhone, setModalPhone] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [agreeCheckbox, setAgreeCheckbox] = useState(true);

    function sendForm(e) {
        e.preventDefault();
        const emailVal = modalEmail.trim();
        const formData = {
            name: modalName.trim(),
            phone: modalPhone.trim(),
            email: emailVal,
            products: [{name: 'productName', amount: 1}]
        };

        if(agreeCheckbox && (emailVal !== '')) {
            axios.post(`${API_URL}/email-sender/sendBasketOrder`, formData)
                .then(res => {
                    $('#modal').modal('hide');
                    $('#success-modal').modal('show');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    <div className="modal-title">Купить в один клик</div>
                    <div className="modal-descriptor">Заполните форму, и наш специалист свяжется с вами в ближайшее
                        время
                    </div>
                    <div className="form-wrapper w-form">
                        <form className="form" id="form-2" onSubmit={(e) => sendForm(e)}>
                            <input className="text-field w-input"
                                   data-name="Имя"
                                   name="name"
                                   maxLength="256"
                                   placeholder="Имя"
                                   required="required"
                                   type="text"
                                   value={modalName}
                                   onChange={(e) => setModalName(e.target.value)}
                            />
                            <InputMask className="phone-input text-field w-input"
                                       name="phone"
                                       placeholder="Телефон"
                                       mask="+7 (999) 999-99-99"
                                       required="required"
                                       value={modalPhone}
                                       onChange={(e) => setModalPhone(e.target.value)}
                            />
                            <input className="text-field w-input"
                                   name="email"
                                   maxLength="256"
                                   placeholder="E-mail*"
                                   type="email"
                                   required="required"
                                   value={modalEmail}
                                   onChange={(e) => setModalEmail(e.target.value)}
                            />
                            <input type="checkbox"
                                   id="cb1"
                                   required="required"
                                   checked={agreeCheckbox}
                                   onChange={() => setAgreeCheckbox(!agreeCheckbox)}
                            />
                            <label htmlFor="cb1">
                                Я согласен на <a href="#">обработку персональных данных</a>
                            </label>
                            <button type="submit" className="btn org  main-btn form-btn">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
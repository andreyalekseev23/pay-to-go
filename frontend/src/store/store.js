import { createStore } from 'vuex';

const store = createStore({
    state: {
        // request data
        special_path: undefined, // undefined || string
        special_picture: undefined, // undefined || string
        slug: undefined, // string
        tabel: undefined, // string
        hookah: [], // array
        order: [], // array
        pay_url: undefined, // undefined || string
        commission_user: undefined, // number
        // generate data
        summary: 0, // number || string,
        menu_summary: 0, // number || string,
        hookah_summary: 0, // number || string,
        commission: true, // boolean
        paid: undefined, // boolean
        empty: undefined, // boolean
        special: undefined, // boolean
        share: false, // boolean
        share_order: [], // array
        share_hookah: [], // array
    },
    mutations: {
        setState (state, order) {
            console.log('set order');

            state.special_path = order.special_path;
            state.special_picture = order.special_picture;
            state.slug = order.slug;
            state.tabel = order.tabel;
            state.hookah = order.hookah;
            state.order = order.order;
            state.commission_rest = order.commission_rest;
            state.commission_user = order.commission_user;
            state.pay_url = order.pay_url;

            console.log('order: ' + state.order);
            console.log('hookah: ' + state.hookah);

            this.commit('calcSummary');
            this.commit('checkEmpty');
            this.commit('checkPaid');
            this.commit('checkSpecial');
        },
        calcSummary (state) {
            console.log('calc summary');

            let counter = 0;
            let counter2 = 0;

            if (state.share) {
                state.share_order.forEach(item => {
                    if(item.amount === 1) {
                        if(!item.status) {
                            counter = counter + item.price * item.amount;
                        }
                    }
                    else {
                        if(!item.status) {
                            counter = counter + item.price * item.amount_share;
                        }
                    }
                });
                state.share_hookah.forEach(item => {
                    if(item.amount === 1) {
                        if(!item.status) {
                            counter2 = counter2 + item.price * item.amount;
                        }
                    }
                    else {
                        if(!item.status) {
                            counter2 = counter2 + item.price * item.amount_share;
                        }
                    }
                });
            }
            else {
                state.order.forEach(item => {
                    if(!item.status) {
                        counter = counter + item.price * item.amount;
                    }
                });
                state.hookah.forEach(item => {
                    if(!item.status) {
                        counter2 = counter2 + item.price * item.amount;
                    }
                });
            }

            const summary = counter + counter2;

            if (state.commission) {
                state.summary = summary + (summary / 100 * state.commission_user);
                state.menu_summary = counter + (counter / 100 * state.commission_user);
                state.hookah_summary = counter2 + (counter2 / 100 * state.commission_user);
            }
            else {
                state.summary = summary ;
                state.menu_summary = counter ;
                state.hookah_summary = counter2;
            }
            console.log('summary: ' + state.summary);
            console.log('summary_menu: ' + state.menu_summary);
            console.log('summary_hookah: ' + state.hookah_summary);
        },
        checkEmpty (state) {
            console.log('check empty');

            if (state.order.length === 0 && state.hookah.length === 0) {
                state.empty = true;
            }
            else {
                state.empty = false;
            }
            console.log('empty: ' + state.empty);
        },
        checkPaid (state) {
            console.log('check paid');

            let counter = 0;

            state.order.forEach(item => {
                if (!item.status) {
                    counter++
                }
            });

            state.hookah.forEach(item => {
                if (!item.status) {
                    counter++
                }
            });

            if (counter !== 0) {
                state.paid = false;
            }
            else if (state.order.length === 0 && state.hookah.length === 0) {
                state.paid = false;
            }
            else {
                state.paid = true;
            }

            console.log('paid: ' + state.paid);
        },
        checkSpecial (state) {
            console.log('check special');

            if (state.special_picture) {
                state.special = true;
            }
            else {
                state.special = false;
            }

        },
        createPayment (state) {
            console.log('create payment');

            if (state.share) {
                console.log('create share payment');
            }
            else {
                console.log('create single payment');
            }
        },
        shareSwitcher (state) {
            state.share = !state.share;

            this.commit('calcSummary');
        },
        minusHandler (state, item) {
            if (!item.checked) {
                if (item.amount_share > 1) {
                    item.amount_share--
                }
            }
            else {
                if (item.category === 'menu') {
                    if(item.amount_share > 1) {
                        const result = state.share_order.find(i => i.slug === item.slug);
                        result.amount_share--
                    }
                }
                else {
                    if(item.amount_share > 1) {
                        const result = state.share_hookah.find(i => i.slug === item.slug);
                        result.amount_share--
                    }
                }
            }

            this.commit('calcSummary');

        },
        plusHandler (state, item) {
            if (!item.checked) {
                if (item.amount_share < item.amount) {
                    item.amount_share++
                }
            }
            else {
                if (item.category === 'menu') {
                    if (item.amount_share < item.amount) {
                        const result = state.share_order.find(i => i.slug === item.slug);
                        result.amount_share++
                    }
                }
                else {
                    if (item.amount_share < item.amount) {
                        const result = state.share_hookah.find(i => i.slug === item.slug);
                        result.amount_share++
                    }
                }
            }

            this.commit('calcSummary');
        },
        setShared (state, item) {
            if (item.category === 'menu') {
                if (item.checked) {
                    state.share_order.push(item);

                }
                else if (!item.checked) {
                    state.share_order = state.share_order.filter(i => i.slug !== item.slug);
                }
            }
            else {
                if (item.checked) {
                    state.share_hookah.push(item);

                }
                else if (!item.checked) {
                    state.share_hookah = state.share_hookah.filter(i => i.slug !== item.slug);
                }
            }
            console.log(state.share_hookah)
            this.commit('calcSummary');
        },
    }
});

export default store;
const localBtn = document.getElementById('localBtn');
        let localClicks = localStorage.getItem('localClicks') ? parseInt(localStorage.getItem('localClicks')) : 0;
        localBtn.textContent = `Ця кнопка була натиснута: ${localClicks} раз`;

        localBtn.addEventListener('click', () => {
            localClicks++;
            localStorage.setItem('localClicks', localClicks);
            localBtn.textContent = `Ця кнопка була натиснута: ${localClicks} раз`;
        });

        const sessionBtn = document.getElementById('sessionBtn');
        let sessionClicks = sessionStorage.getItem('sessionClicks') ? parseInt(sessionStorage.getItem('sessionClicks')) : 0;
        sessionBtn.textContent = `Ця кнопка була натиснута: ${sessionClicks} раз`;

        sessionBtn.addEventListener('click', () => {
            sessionClicks++;
            sessionStorage.setItem('sessionClicks', sessionClicks);
            sessionBtn.textContent = `Ця кнопка була натиснута: ${sessionClicks} раз`;
        });

        const clearBtn = document.getElementById('clearBtn');
        clearBtn.addEventListener('click', () => {
            localStorage.clear();
            sessionStorage.clear();
            localClicks = 0;
            sessionClicks = 0;
            localBtn.textContent = `Ця кнопка була натиснута: ${localClicks} раз`;
            sessionBtn.textContent = `Ця кнопка була натиснута: ${sessionClicks} раз`;
        });

        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            document.cookie = name + '=; Max-Age=-99999999;';
        }

        function calculateAge(birthDate) {
            const today = new Date();
            const birth = new Date(birthDate);
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        }

        let birthDate = getCookie('birthDate');
        const ageMessage = document.getElementById('ageMessage');

        if (!birthDate) {
            birthDate = prompt('Введіть вашу дату народження (yyyy-mm-dd):');
            setCookie('birthDate', birthDate, 365);
        }

        ageMessage.textContent = 'Ваш вік: ' + calculateAge(birthDate);

        document.getElementById('recalculateBtn').addEventListener('click', () => {
            eraseCookie('birthDate');
            birthDate = prompt('Введіть вашу дату народження (yyyy-mm-dd):');
            setCookie('birthDate', birthDate, 365);
            ageMessage.textContent = 'Ваш вік: ' + calculateAge(birthDate);
        });
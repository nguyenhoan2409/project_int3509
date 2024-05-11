describe('Update Score Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý điểm').click()
        cy.get('.action-admin-td').find('svg[id = "2"]').click();
    })

    // football
    it('Football Test 1', () => {
        cy.get('.form-update-score').find('input[name="football_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Football Test 2', () => {
        cy.get('.form-update-score').find('input[name="football_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Football Test 3', () => {
        cy.get('.form-update-score').find('input[name="football_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    // basketball

    it('Basketball Test 1', () => {
        cy.get('.form-update-score').find('input[name="basketball_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Basketball Test 2', () => {
        cy.get('.form-update-score').find('input[name="basketball_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Basketball Test 3', () => {
        cy.get('.form-update-score').find('input[name="basketball_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    // badminton

    it('Badminton Test 1', () => {
        cy.get('.form-update-score').find('input[name="badminton_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Badminton Test 2', () => {
        cy.get('.form-update-score').find('input[name="badminton_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Badminton Test 3', () => {
        cy.get('.form-update-score').find('input[name="badminton_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

     // tabletennis

     it('Tabletennis Test 1', () => {
        cy.get('.form-update-score').find('input[name="tabletennis_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Tabletennis Test 2', () => {
        cy.get('.form-update-score').find('input[name="tabletennis_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Tabletennis Test 3', () => {
        cy.get('.form-update-score').find('input[name="tabletennis_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

     // air_volleyball

     it('Air_volleyball Test 1', () => {
        cy.get('.form-update-score').find('input[name="airVolleyball_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Air_volleyball Test 2', () => {
        cy.get('.form-update-score').find('input[name="airVolleyball_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Air_volleyball Test 3', () => {
        cy.get('.form-update-score').find('input[name="airVolleyball_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    //volleyball

    it('Volleyball Test 1', () => {
        cy.get('.form-update-score').find('input[name="volleyball_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Volleyball Test 2', () => {
        cy.get('.form-update-score').find('input[name="volleyball_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Volleyball Test 3', () => {
        cy.get('.form-update-score').find('input[name="volleyball_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

     // taekwondo

     it('Taekwondo Test 1', () => {
        cy.get('.form-update-score').find('input[name="taekwondo_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Taekwondo Test 2', () => {
        cy.get('.form-update-score').find('input[name="taekwondo_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Taekwondo Test 3', () => {
        cy.get('.form-update-score').find('input[name="taekwondo_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

     // golf

     it('Golf Test 1', () => {
        cy.get('.form-update-score').find('input[name="golf_score"]').clear().type('10')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg').should('contain', "Đã cập nhật điểm thành công")
    })

    it('Golf Test 2', () => {
        cy.get('.form-update-score').find('input[name="golf_score"]').clear().type('-1')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })

    it('Golf Test 3', () => {
        cy.get('.form-update-score').find('input[name="golf_score"]').clear().type('11')
        cy.get('.update-score-button').click()
        cy.get('.check-cdr-msg-error').should('contain', "Điểm phải nhỏ hoặc bằng 10 và lớn hơn hoặc bằng 0")
    })
/*

    afterEach(() => {
        let count = 0;
        cy.get('.form-update-score').find('input[name="football_score"]').then(($span) => {
            const football = parseFloat($span.text())
            if(football >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="basketball_score"]').then(($span) => {
            const basketball = parseFloat($span.text());
            if(basketball >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="tabletennis_score"]').then(($span) => {
            const tabletennis = parseFloat($span.text());
            if(tabletennis >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="badminton_score"]').then(($span) => {
            const badminton = parseFloat($span.text());
            if(badminton >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="volleyball_score"]').then(($span) => {
            const volleyball = parseFloat($span.text());
            if(volleyball >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="airVolleyball_score"]').then(($span) => {
            const airVolleyball = parseFloat($span.text());
            if(airVolleyball >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="taekwondo_score"]').then(($span) => {
            const taekwondo = parseFloat($span.text());
            if(taekwondo >= 4) count++
        })
        cy.get('.form-update-score').find('input[name="golf_score"]').then(($span) => {
            const golf = parseFloat($span.text());
            if(golf >= 4) count++
        })
        if(count >= 4) {
            cy.get('.check-cdr-msg').should('contain', "Sinh viên đã đạt chuẩn đầu ra")
        } else {
            cy.get('.check-cdr-msg-error').should('contain', "Sinh viên chưa đạt chuẩn đầu ra")
        }
        
    })
    */
})
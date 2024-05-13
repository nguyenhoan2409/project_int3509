describe('Search Score By Student Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020407@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('24092002')
        cy.get('form').submit();
        cy.contains('Tra cứu điểm').click()
    })
    it('Create certificate request', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "email"]').type('10000002@gmail.com')
        cy.get('input[id = "phonenumber"]').type('0373311038')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/request')
    })

    it('Email error 1', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "email"]').type('10000002')
        cy.get('input[id = "phonenumber"]').type('0373311038')
        cy.get('.msg-request').should('contain', 'Định dạng email cần có @')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/certificate/10000002')
    })

    it('Email error 2', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "email"]').type('10000002@')
        cy.get('input[id = "phonenumber"]').type('0373311038')
        cy.get('.msg-request').should('contain', 'Cần viết thêm sau @')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/certificate/10000002')
    })

    it('Phone nummber error 1', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "phonenumber"]').type('123456789')
        cy.get('input[id = "email"]').type('10000002@gmail.com')
        cy.get('.msg-request').should('contain', 'Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx..')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/certificate/10000002')
    })

    it('Phone nummber error 2', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "phonenumber"]').type('123')
        cy.get('input[id = "email"]').type('10000002@gmail.com')
        cy.get('.msg-request').should('contain', 'Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx..')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/certificate/10000002')
    })

    it('Phone nummber error 3', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "phonenumber"]').type('1234567891011')
        cy.get('input[id = "email"]').type('10000002@gmail.com')
        cy.get('.msg-request').should('contain', 'Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx..')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/certificate/10000002')
    })

    it('Phone nummber error 4', () => {
        cy.get('.certificate-icons').find('svg[id = "10000002"]').click()
        cy.get('input[id = "phonenumber"]').type('abcdefghijk')
        cy.get('input[id = "email"]').type('10000002@gmail.com')
        cy.get('input[id = "phonenumber"]').should('have.value', '')
        cy.get('button').click()
        cy.url().should('eq', 'http://localhost:3000/certificate/10000002')
    })

    it('Disabled Button', () => {
        cy.get('.certificate-icons').find('svg[id = "10000001"]').click()
        cy.get('.msg-request').should('contain', 'Bạn chưa đạt chuẩn đầu ra')
        cy.get('button').should('be.disabled')
    
    })

})
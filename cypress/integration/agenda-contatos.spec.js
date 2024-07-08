    describe('Agenda Contatos', () => {
        const url = 'https://agenda-contatos-react.vercel.app/';
    
        beforeEach(() => {
        cy.visit(url);
        });
    
        it('Deve adicionar um novo contato', () => {
        cy.get('input[name="name"]').type('Contato Teste');
        cy.get('input[name="email"]').type('contato@teste.com');
        cy.get('input[name="phone"]').type('11999999999');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Contato Teste').should('be.visible');
        cy.contains('contato@teste.com').should('be.visible');
        cy.contains('11999999999').should('be.visible');
        });
    
        it('Deve editar um contato existente', () => {
        cy.contains('Contato Teste').parent().find('button[title="Edit"]').click();
        cy.get('input[name="name"]').clear().type('Contato Editado');
        cy.get('input[name="email"]').clear().type('contato@editado.com');
        cy.get('input[name="phone"]').clear().type('11888888888');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Contato Editado').should('be.visible');
        cy.contains('contato@editado.com').should('be.visible');
        cy.contains('11888888888').should('be.visible');
        });
    
        it('Deve remover um contato', () => {
        cy.contains('Contato Editado').parent().find('button[title="Delete"]').click();
    
        cy.contains('Contato Editado').should('not.exist');
        cy.contains('contato@editado.com').should('not.exist');
        cy.contains('11888888888').should('not.exist');
        });
    });
    
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

      // Verificar se o contato foi adicionado corretamente
    cy.contains('Contato Teste').should('exist');
    cy.contains('contato@teste.com').should('exist');
    cy.contains('11999999999').should('exist');
    });

    it('Deve editar um contato existente', () => {
      // Primeiro, adicionar um contato
    cy.get('input[name="name"]').type('Contato Teste');
    cy.get('input[name="email"]').type('contato@teste.com');
    cy.get('input[name="phone"]').type('11999999999');
    cy.get('button[type="submit"]').click();

      // Clicar no botão de editar
    cy.contains('Contato Teste').parent().find('button[title="Edit"]').click();

      // Editar o contato
    cy.get('input[name="name"]').clear().type('Contato Editado');
    cy.get('input[name="email"]').clear().type('contato@editado.com');
    cy.get('input[name="phone"]').clear().type('11888888888');
    cy.get('button[type="submit"]').click();

      // Verificar se o contato foi editado corretamente
    cy.contains('Contato Editado').should('exist');
    cy.contains('contato@editado.com').should('exist');
    cy.contains('11888888888').should('exist');
    });

    it('Deve remover um contato', () => {
      // Primeiro, adicionar um contato
    cy.get('input[name="name"]').type('Contato Teste');
    cy.get('input[name="email"]').type('contato@teste.com');
    cy.get('input[name="phone"]').type('11999999999');
    cy.get('button[type="submit"]').click();

      // Clicar no botão de remover
    cy.contains('Contato Teste').parent().find('button[title="Delete"]').click();

      // Verificar se o contato foi removido corretamente
    cy.contains('Contato Teste').should('not.exist');
    cy.contains('contato@teste.com').should('not.exist');
    cy.contains('11999999999').should('not.exist');
    cy.wait(1000);
    });
});

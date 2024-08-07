describe('Agenda Contatos', () => {
  const url = 'https://agenda-contatos-react.vercel.app/';

  beforeEach(() => {
    cy.visit(url);
    cy.wait(5000); // Espera 5 segundos para garantir que a página carregue completamente
  });

  it('Deve adicionar um novo contato', () => {
    cy.get('input[placeholder="Nome"]', { timeout: 15000 }).should('be.visible').type('Contato Teste');
    cy.get('input[placeholder="E-mail"]', { timeout: 15000 }).should('be.visible').type('contato@teste.com');
    cy.get('input[placeholder="Telefone"]', { timeout: 15000 }).should('be.visible').type('11999999999');
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click();

    // Verificar se o contato foi adicionado corretamente
    cy.contains('Contato Teste', { timeout: 15000 }).should('exist');
    cy.contains('contato@teste.com', { timeout: 15000 }).should('exist');
    cy.contains('11999999999', { timeout: 15000 }).should('exist');
  });

  it('Deve editar um contato existente', () => {
    // Primeiro, adicionar um contato
    cy.get('input[placeholder="Nome"]', { timeout: 15000 }).should('be.visible').type('Contato Teste');
    cy.get('input[placeholder="E-mail"]', { timeout: 15000 }).should('be.visible').type('contato@teste.com');
    cy.get('input[placeholder="Telefone"]', { timeout: 15000 }).should('be.visible').type('11999999999');
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click();

    cy.wait(5000); // Espera após adicionar um novo contato

    // Espera pelo contato adicionado e o botão de editar estar disponível
    cy.contains('Contato Teste', { timeout: 15000 }).parent().parent().within(() => {
      cy.get('button.edit', { timeout: 15000 }).should('be.visible').click();
    });

    // Editar o contato
    cy.get('input[placeholder="Nome"]', { timeout: 15000 }).clear().type('Contato Editado');
    cy.get('input[placeholder="E-mail"]', { timeout: 15000 }).clear().type('contato@editado.com');
    cy.get('input[placeholder="Telefone"]', { timeout: 15000 }).clear().type('11888888888');
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click();

    cy.wait(5000); // Espera após editar o contato

    // Verificar se o contato foi editado corretamente
    cy.contains('Contato Editado', { timeout: 15000 }).should('exist');
    cy.contains('contato@editado.com', { timeout: 15000 }).should('exist');
    cy.contains('11888888888', { timeout: 15000 }).should('exist');
  });

  it('Deve remover um contato', () => {
    // Primeiro, adicionar um contato
    cy.get('input[placeholder="Nome"]', { timeout: 15000 }).should('be.visible').type('Contato Teste');
    cy.get('input[placeholder="E-mail"]', { timeout: 15000 }).should('be.visible').type('contato@teste.com');
    cy.get('input[placeholder="Telefone"]', { timeout: 15000 }).should('be.visible').type('11999999999');
    cy.get('button[type="submit"]', { timeout: 15000 }).should('be.visible').click();

    cy.wait(5000); // Espera após adicionar um novo contato

    // Espera pelo contato adicionado e o botão de remover estar disponível
    cy.contains('Contato Teste', { timeout: 15000 }).parent().parent().within(() => {
      cy.get('button.delete', { timeout: 15000 }).should('be.visible').click();
    });

    // Verificar se o contato foi removido corretamente
    cy.contains('Contato Teste', { timeout: 15000 }).should('not.exist');
    cy.contains('contato@teste.com', { timeout: 15000 }).should('not.exist');
    cy.contains('11999999999', { timeout: 15000 }).should('not.exist');
  });
});

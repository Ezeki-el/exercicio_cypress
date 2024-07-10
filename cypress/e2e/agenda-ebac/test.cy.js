describe('Agenda Contatos', () => {
    const url = 'https://agenda-contatos-react.vercel.app/';
  
    beforeEach(() => {
      cy.visit(url);
      cy.wait(2000); // Espera 2 segundos para garantir que a página carregue
    });
  
    it('Deve adicionar um novo contato', () => {
      cy.get('input[placeholder="Nome"]').should('be.visible').type('Contato Teste');
      cy.get('input[placeholder="E-mail"]').should('be.visible').type('contato@teste.com');
      cy.get('input[placeholder="Telefone"]').should('be.visible').type('11999999999');
      cy.get('button[type="submit"]').should('be.visible').click();
  
      // Verificar se o contato foi adicionado corretamente
      cy.contains('Contato Teste').should('exist');
      cy.contains('contato@teste.com').should('exist');
      cy.contains('11999999999').should('exist');
    });
  
    it('Deve editar um contato existente', () => {
      // Primeiro, adicionar um contato
      cy.get('input[placeholder="Nome"]').should('be.visible').type('Contato Teste');
      cy.get('input[placeholder="E-mail"]').should('be.visible').type('contato@teste.com');
      cy.get('input[placeholder="Telefone"]').should('be.visible').type('11999999999');
      cy.get('button[type="submit"]').should('be.visible').click();
  
      // Clicar no botão de editar
      cy.contains('Contato Teste').parent().find('button.edit').should('be.visible').click();
  
      // Editar o contato
      cy.get('input[placeholder="Nome"]').clear().type('Contato Editado');
      cy.get('input[placeholder="E-mail"]').clear().type('contato@editado.com');
      cy.get('input[placeholder="Telefone"]').clear().type('11888888888');
      cy.get('button[type="submit"]').should('be.visible').click();
  
      // Verificar se o contato foi editado corretamente
      cy.contains('Contato Editado').should('exist');
      cy.contains('contato@editado.com').should('exist');
      cy.contains('11888888888').should('exist');
    });
  
    it('Deve remover um contato', () => {
      // Primeiro, adicionar um contato
      cy.get('input[placeholder="Nome"]').should('be.visible').type('Contato Teste');
      cy.get('input[placeholder="E-mail"]').should('be.visible').type('contato@teste.com');
      cy.get('input[placeholder="Telefone"]').should('be.visible').type('11999999999');
      cy.get('button[type="submit"]').should('be.visible').click();
  
      // Clicar no botão de remover
      cy.contains('Contato Teste').parent().find('button.delete').should('be.visible').click();
  
      // Verificar se o contato foi removido corretamente
      cy.contains('Contato Teste').should('not.exist');
      cy.contains('contato@teste.com').should('not.exist');
      cy.contains('11999999999').should('not.exist');
    });
  });
  
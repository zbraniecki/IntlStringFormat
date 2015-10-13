describe('Intl.StringFormat polyfill', function() {
  it('should exist', function() {
    expect(Intl.StringFormat).to.be.a('function');
  });

  it('should truncate too long string from the end', function() {
    const formatter = new Intl.StringFormat();
    const string = 'Lorem ipsum dolor sit amet';
    expect(formatter.truncate(string, {
      maxLength: 10,
      type: 'end'
    })).to.be('Lorem ips…');
  });
  it('should truncate too long string from the start', function() {
    const formatter = new Intl.StringFormat();
    const string = 'Lorem ipsum dolor sit amet';
    expect(formatter.truncate(string, {
      maxLength: 10,
      type: 'start'
    })).to.be('…or sit amet');
  });
  it('should truncate too long string in the middle', function() {
    const formatter = new Intl.StringFormat();
    const string = 'Lorem ipsum dolor sit amet';
    expect(formatter.truncate(string, {
      maxLength: 10,
      type: 'middle'
    })).to.be('Lorem…amet');
  });
  it('should truncate work on a string object', function() {
    const string = 'Lorem ipsum dolor sit amet';
    expect(string.truncate(['en-US'], {
      maxLength: 10,
      type: 'middle'
    })).to.be('Lorem…amet');
  });
});

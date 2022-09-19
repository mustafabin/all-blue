puts "deleting all data"
User.destroy_all

puts "creating users"
10.times do
    name = Faker::JapaneseMedia::OnePiece.character
    new_user = User.create!(username: name, email: "#{name.delete(' ')}@bounty.com", password: "123", tag: Faker::JapaneseMedia::OnePiece.island)
end

puts "seeded successfully 👒🏴‍☠️"
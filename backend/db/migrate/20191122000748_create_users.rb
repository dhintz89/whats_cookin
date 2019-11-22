class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :name
      t.string :email
      t.string :phone
      t.string :carrier
      t.string :contactPreference

      t.timestamps
    end
  end
end
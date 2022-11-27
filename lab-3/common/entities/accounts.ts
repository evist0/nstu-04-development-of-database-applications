import { Mongo } from "meteor/mongo";
import { UserProfile } from "meteor/meteor";
import { Tariff } from "/common/entities/tariffs";

export interface Account {
    _id?: string;

    userProfile: UserProfile;
    tariff: Tariff;
}

export const AccountsCollection = new Mongo.Collection<Account>('accounts');
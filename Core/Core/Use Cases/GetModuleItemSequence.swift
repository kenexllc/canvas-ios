//
// This file is part of Canvas.
// Copyright (C) 2020-present  Instructure, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//

import Foundation
import CoreData

public class GetModuleItemSequence: APIUseCase {
    public typealias Model = ModuleItemSequence

    public let courseID: String
    public let assetType: GetModuleItemSequenceRequest.AssetType
    public let assetID: String

    public var cacheKey: String? {
        "module-item-sequence/\(courseID)/\(assetType.rawValue)/\(assetID)"
    }

    public init(courseID: String, assetType: GetModuleItemSequenceRequest.AssetType, assetID: String) {
        self.courseID = courseID
        self.assetType = assetType
        self.assetID = assetID
    }

    public var request: GetModuleItemSequenceRequest {
        GetModuleItemSequenceRequest(courseID: courseID, assetType: assetType, assetID: assetID)
    }

    public var scope: Scope {
        let predicate = NSCompoundPredicate(andPredicateWithSubpredicates: [
            NSPredicate(key: #keyPath(ModuleItemSequence.courseID), equals: courseID),
            NSPredicate(key: #keyPath(ModuleItemSequence.assetTypeRaw), equals: assetType.rawValue),
            NSPredicate(key: #keyPath(ModuleItemSequence.assetID), equals: assetID),
        ])
        return Scope(predicate: predicate, orderBy: #keyPath(ModuleItemSequence.assetID))
    }

    public func write(response: APIModuleItemSequence?, urlResponse: URLResponse?, to client: NSManagedObjectContext) {
        guard let response = response else { return }
        let sequence: ModuleItemSequence = client.fetch(scope: scope).first ?? client.insert()
        sequence.courseID = courseID
        sequence.assetType = assetType
        sequence.assetID = assetID
        let node = response.items.first
        sequence.prev = node?.prev.flatMap { .save($0, forCourse: courseID, in: client) }
        sequence.next = node?.next.flatMap { .save($0, forCourse: courseID, in: client) }
        sequence.current = node?.current.flatMap { .save($0, forCourse: courseID, in: client) }
    }
}

// TODO: own file
public class GetModuleItem: APIUseCase {
    public typealias Model = ModuleItem

    public let courseID: String
    public let moduleID: String
    public let itemID: String

    public var cacheKey: String? { request.path }

    public var request: GetModuleItemRequest {
        return .init(courseID: courseID, moduleID: moduleID, itemID: itemID)
    }

    public var scope: Scope { .where(#keyPath(ModuleItem.id), equals: itemID) }

    public init(courseID: String, moduleID: String, itemID: String) {
        self.courseID = courseID
        self.moduleID = moduleID
        self.itemID = itemID
    }

    public func write(response: APIModuleItem?, urlResponse: URLResponse?, to client: NSManagedObjectContext) {
        guard let response = response else { return }
        ModuleItem.save(response, forCourse: courseID, in: client)
    }
}